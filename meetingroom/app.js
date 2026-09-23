(() => {
  const $ = (selector) => document.querySelector(selector);
  const state = {
    audioStream: null,
    videoStream: null,
    audioContext: null,
    analyser: null,
    meterFrame: null,
    microphoneOn: false,
    cameraOn: false,
    testing: false,
    testTimer: null,
    testPeak: 0,
  };

  const elements = {
    setupView: $('#setup-view'),
    roomView: $('#room-view'),
    form: $('#join-form'),
    name: $('#display-name'),
    nameCount: $('#name-count'),
    nameError: $('#name-error'),
    previewName: $('#preview-name'),
    previewAvatar: $('#preview-avatar'),
    previewFrame: $('#preview-frame'),
    cameraPreview: $('#camera-preview'),
    roomVideo: $('#room-video'),
    selfTile: $('.self-tile'),
    roomAvatar: $('#room-avatar'),
    roomName: $('#room-name'),
    selfName: $('#self-name'),
    micToggle: $('#mic-toggle'),
    cameraToggle: $('#camera-toggle'),
    previewMic: $('#preview-mic'),
    previewCamera: $('#preview-camera'),
    roomMic: $('#room-mic'),
    roomCamera: $('#room-camera'),
    micLabel: $('#mic-toggle-label'),
    cameraLabel: $('#camera-toggle-label'),
    deviceSelects: $('#device-selects'),
    micSelectWrap: $('#mic-select-wrap'),
    cameraSelectWrap: $('#camera-select-wrap'),
    micSelect: $('#microphone-select'),
    cameraSelect: $('#camera-select'),
    testMic: $('#test-mic'),
    testStatus: $('#mic-test-status'),
    levelMeter: $('#level-meter'),
    status: $('#status-message'),
    leaveRoom: $('#leave-room'),
  };

  const hasMediaSupport = Boolean(navigator.mediaDevices?.getUserMedia);

  function initials(name) {
    const value = name.trim();
    if (!value) return '你';
    const parts = value.split(/\s+/).filter(Boolean);
    return (parts.length > 1 ? parts[0][0] + parts.at(-1)[0] : [...value].slice(0, 2).join('')).toUpperCase();
  }

  function setStatus(message, isError = true) {
    elements.status.textContent = message;
    elements.status.style.color = isError ? 'var(--danger)' : 'var(--green)';
  }

  function mediaErrorMessage(error, kind) {
    if (!hasMediaSupport) return '当前浏览器不支持音视频设备访问，请使用最新版 Chrome、Edge 或 Safari。';
    if (error?.name === 'NotAllowedError') return `浏览器没有获得${kind}权限。请在地址栏旁的权限设置中允许后再试。`;
    if (error?.name === 'NotFoundError') return `没有找到可用的${kind}设备。请连接设备后再试。`;
    if (error?.name === 'NotReadableError') return `${kind}可能正在被其他应用占用。关闭其他通话应用后再试。`;
    return `无法启动${kind}。请检查设备连接和浏览器权限。`;
  }

  function stopStream(stream) {
    stream?.getTracks().forEach((track) => track.stop());
  }

  function syncButton(button, enabled, onLabel, offLabel) {
    button.setAttribute('aria-pressed', String(enabled));
    button.classList.toggle('is-off', !enabled);
    const label = enabled ? onLabel : offLabel;
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  function syncMediaUI() {
    elements.micToggle.setAttribute('aria-pressed', String(state.microphoneOn));
    elements.cameraToggle.setAttribute('aria-pressed', String(state.cameraOn));
    elements.micLabel.textContent = state.microphoneOn ? '已开启' : '关闭';
    elements.cameraLabel.textContent = state.cameraOn ? '已开启' : '关闭';
    syncButton(elements.previewMic, state.microphoneOn, '关闭麦克风', '开启麦克风');
    syncButton(elements.previewCamera, state.cameraOn, '关闭摄像头', '开启摄像头');
    syncButton(elements.roomMic, state.microphoneOn, '关闭麦克风', '开启麦克风');
    syncButton(elements.roomCamera, state.cameraOn, '关闭摄像头', '开启摄像头');
    elements.previewFrame.classList.toggle('has-video', state.cameraOn);
    elements.selfTile.classList.toggle('has-video', state.cameraOn);
    elements.testStatus.textContent = state.microphoneOn
      ? (state.testing ? '请正常说一句话，我们正在检测音量。' : '麦克风已开启，可以开始测试。')
      : '开启麦克风后，可以做一次声音测试。';
  }

  async function listDevices() {
    if (!hasMediaSupport) return;
    const devices = await navigator.mediaDevices.enumerateDevices();
    const microphones = devices.filter((device) => device.kind === 'audioinput');
    const cameras = devices.filter((device) => device.kind === 'videoinput');

    const fill = (select, items, fallback) => {
      const selected = select.value;
      select.replaceChildren(...items.map((device, index) => {
        const option = document.createElement('option');
        option.value = device.deviceId;
        option.textContent = device.label || `${fallback} ${index + 1}`;
        return option;
      }));
      if ([...select.options].some((option) => option.value === selected)) select.value = selected;
    };

    fill(elements.micSelect, microphones, '麦克风');
    fill(elements.cameraSelect, cameras, '摄像头');
    elements.micSelectWrap.hidden = microphones.length === 0;
    elements.cameraSelectWrap.hidden = cameras.length === 0;
    elements.deviceSelects.hidden = microphones.length + cameras.length === 0;
  }

  async function enableMicrophone() {
    if (!hasMediaSupport) throw new Error('UnsupportedMedia');
    stopStream(state.audioStream);
    const deviceId = elements.micSelect.value;
    state.audioStream = await navigator.mediaDevices.getUserMedia({
      audio: deviceId ? { deviceId: { exact: deviceId }, echoCancellation: true, noiseSuppression: true } : { echoCancellation: true, noiseSuppression: true },
      video: false,
    });
    state.microphoneOn = true;
    await listDevices();
    setupAnalyser();
    syncMediaUI();
    setStatus('麦克风已开启。', false);
  }

  function disableMicrophone() {
    stopStream(state.audioStream);
    state.audioStream = null;
    state.microphoneOn = false;
    finishMicTest(false);
    teardownAnalyser();
    syncMediaUI();
    setStatus('麦克风已关闭。', false);
  }

  async function enableCamera() {
    if (!hasMediaSupport) throw new Error('UnsupportedMedia');
    stopStream(state.videoStream);
    const deviceId = elements.cameraSelect.value;
    state.videoStream = await navigator.mediaDevices.getUserMedia({
      video: deviceId ? { deviceId: { exact: deviceId }, width: { ideal: 1280 }, height: { ideal: 720 } } : { width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    state.cameraOn = true;
    elements.cameraPreview.srcObject = state.videoStream;
    elements.roomVideo.srcObject = state.videoStream;
    await listDevices();
    syncMediaUI();
    setStatus('摄像头已开启。', false);
  }

  function disableCamera() {
    stopStream(state.videoStream);
    state.videoStream = null;
    state.cameraOn = false;
    elements.cameraPreview.srcObject = null;
    elements.roomVideo.srcObject = null;
    syncMediaUI();
    setStatus('摄像头已关闭。', false);
  }

  async function toggleMicrophone() {
    setStatus('');
    try {
      if (state.microphoneOn) disableMicrophone();
      else await enableMicrophone();
    } catch (error) {
      state.microphoneOn = false;
      syncMediaUI();
      setStatus(mediaErrorMessage(error, '麦克风'));
    }
  }

  async function toggleCamera() {
    setStatus('');
    try {
      if (state.cameraOn) disableCamera();
      else await enableCamera();
    } catch (error) {
      state.cameraOn = false;
      syncMediaUI();
      setStatus(mediaErrorMessage(error, '摄像头'));
    }
  }

  function setupAnalyser() {
    teardownAnalyser();
    if (!state.audioStream) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    state.audioContext = new AudioContext();
    state.analyser = state.audioContext.createAnalyser();
    state.analyser.fftSize = 256;
    state.analyser.smoothingTimeConstant = .72;
    state.audioContext.createMediaStreamSource(state.audioStream).connect(state.analyser);
    drawMeter();
  }

  function teardownAnalyser() {
    if (state.meterFrame) cancelAnimationFrame(state.meterFrame);
    state.meterFrame = null;
    state.analyser = null;
    state.audioContext?.close().catch(() => {});
    state.audioContext = null;
    updateMeter(0);
  }

  function updateMeter(level) {
    const percent = Math.round(level * 100);
    elements.levelMeter.setAttribute('aria-valuenow', String(percent));
    const active = Math.ceil(level * 8);
    [...elements.levelMeter.children].forEach((bar, index) => bar.classList.toggle('active', index < active));
  }

  function drawMeter() {
    if (!state.analyser) return;
    const samples = new Uint8Array(state.analyser.frequencyBinCount);
    state.analyser.getByteFrequencyData(samples);
    const average = samples.reduce((sum, value) => sum + value, 0) / samples.length;
    const level = Math.min(1, average / 95);
    if (state.testing) state.testPeak = Math.max(state.testPeak, level);
    updateMeter(level);
    state.meterFrame = requestAnimationFrame(drawMeter);
  }

  async function startMicTest() {
    if (state.testing) {
      finishMicTest(true);
      return;
    }
    elements.testMic.disabled = true;
    try {
      if (!state.microphoneOn) await enableMicrophone();
      if (state.audioContext?.state === 'suspended') await state.audioContext.resume();
      state.testing = true;
      state.testPeak = 0;
      elements.testMic.textContent = '停止测试';
      elements.testMic.disabled = false;
      syncMediaUI();
      let seconds = 8;
      elements.testStatus.textContent = `请正常说话，剩余 ${seconds} 秒。`;
      state.testTimer = window.setInterval(() => {
        seconds -= 1;
        if (seconds <= 0) finishMicTest(true);
        else elements.testStatus.textContent = `请正常说话，剩余 ${seconds} 秒。`;
      }, 1000);
    } catch (error) {
      elements.testMic.disabled = false;
      setStatus(mediaErrorMessage(error, '麦克风'));
    }
  }

  function finishMicTest(showResult) {
    if (state.testTimer) window.clearInterval(state.testTimer);
    state.testTimer = null;
    const wasTesting = state.testing;
    state.testing = false;
    elements.testMic.textContent = '开始测试';
    elements.testMic.disabled = false;
    if (showResult && wasTesting) {
      const passed = state.testPeak >= .045;
      elements.testStatus.textContent = passed ? '检测到声音，麦克风工作正常。' : '没有检测到明显声音，请检查输入设备或系统音量。';
      setStatus(passed ? '麦克风测试通过。' : '麦克风没有检测到声音。', !passed);
    } else if (!state.microphoneOn) {
      elements.testStatus.textContent = '开启麦克风后，可以做一次声音测试。';
    }
  }

  function updateIdentity() {
    const value = elements.name.value;
    elements.nameCount.textContent = `${[...value].length}/40`;
    elements.previewName.textContent = value.trim() || '你的预览';
    elements.previewAvatar.textContent = initials(value);
    elements.roomAvatar.textContent = initials(value);
    if (value.trim()) {
      elements.name.removeAttribute('aria-invalid');
      elements.nameError.hidden = true;
    }
  }

  function joinRoom(event) {
    event.preventDefault();
    const name = elements.name.value.trim();
    if (!name) {
      elements.name.setAttribute('aria-invalid', 'true');
      elements.nameError.hidden = false;
      elements.name.focus();
      return;
    }
    elements.roomName.textContent = name;
    elements.selfName.textContent = `${name}（你）`;
    elements.setupView.hidden = true;
    elements.roomView.hidden = false;
    document.title = `会议室 · ${name}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function leaveRoom() {
    elements.roomView.hidden = true;
    elements.setupView.hidden = false;
    document.title = 'Meetingroom · 入会准备';
    setStatus('你已离开会议室，设备设置仍然保留。', false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  elements.name.addEventListener('input', updateIdentity);
  elements.form.addEventListener('submit', joinRoom);
  elements.micToggle.addEventListener('click', toggleMicrophone);
  elements.previewMic.addEventListener('click', toggleMicrophone);
  elements.roomMic.addEventListener('click', toggleMicrophone);
  elements.cameraToggle.addEventListener('click', toggleCamera);
  elements.previewCamera.addEventListener('click', toggleCamera);
  elements.roomCamera.addEventListener('click', toggleCamera);
  elements.testMic.addEventListener('click', startMicTest);
  elements.leaveRoom.addEventListener('click', leaveRoom);
  elements.micSelect.addEventListener('change', async () => {
    if (state.microphoneOn) {
      try { await enableMicrophone(); } catch (error) { setStatus(mediaErrorMessage(error, '麦克风')); }
    }
  });
  elements.cameraSelect.addEventListener('change', async () => {
    if (state.cameraOn) {
      try { await enableCamera(); } catch (error) { setStatus(mediaErrorMessage(error, '摄像头')); }
    }
  });
  navigator.mediaDevices?.addEventListener?.('devicechange', listDevices);

  updateIdentity();
  syncMediaUI();
  if (!hasMediaSupport) setStatus('当前浏览器不支持音视频设备访问。');

  window.addEventListener('pagehide', () => {
    stopStream(state.audioStream);
    stopStream(state.videoStream);
    teardownAnalyser();
  });
})();
