(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const ROOM_LIMIT = 8;
  const JOIN_TIMEOUT = 14000;
  const HEARTBEAT_INTERVAL = 8000;
  const API_BASE = 'https://chenjinfu-meetingroom-console.chenjinfu.chatgpt.site';

  const state = {
    mode: 'join',
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
    peer: null,
    roomCode: '',
    displayName: '',
    roomPassword: '',
    adminKey: '',
    isHost: false,
    isAdmin: false,
    joined: false,
    intentionalExit: false,
    hostConnection: null,
    dataConnections: new Map(),
    mediaCalls: new Map(),
    remoteStreams: new Map(),
    participants: new Map(),
    kickedPeers: new Set(),
    pendingJoin: null,
    roomInstanceId: '',
    heartbeatTimer: null,
    heartbeatInFlight: false,
    serviceReady: false,
    serviceEnabled: false,
    serviceMessageActive: false,
    connecting: false,
  };

  const elements = {
    setupView: $('#setup-view'),
    roomView: $('#room-view'),
    form: $('#join-form'),
    joinMode: $('#join-mode'),
    createMode: $('#create-mode'),
    setupEyebrow: $('#setup-eyebrow'),
    setupTitle: $('#setup-title'),
    setupIntro: $('#setup-intro'),
    roomCode: $('#room-code'),
    roomError: $('#room-error'),
    roomPassword: $('#room-password'),
    adminKeyField: $('#admin-key-field'),
    adminKey: $('#admin-key'),
    generateKey: $('#generate-key'),
    joinButton: $('#join-button'),
    name: $('#display-name'),
    nameCount: $('#name-count'),
    nameError: $('#name-error'),
    previewName: $('#preview-name'),
    previewAvatar: $('#preview-avatar'),
    previewFrame: $('#preview-frame'),
    cameraPreview: $('#camera-preview'),
    roomVideo: $('#room-video'),
    selfTile: $('#self-tile'),
    roomAvatar: $('#room-avatar'),
    roomName: $('#room-name'),
    selfName: $('#self-name'),
    selfMediaStatus: $('#self-media-status'),
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
    activeRoomCode: $('#active-room-code'),
    roomState: $('#room-state'),
    copyInvite: $('#copy-invite'),
    openAdmin: $('#open-admin'),
    participantGrid: $('#participant-grid'),
    peopleList: $('#people-list'),
    participantCount: $('#participant-count'),
    roomMessage: $('#room-message'),
    tileTemplate: $('#participant-tile-template'),
    adminDialog: $('#admin-dialog'),
    adminAuthView: $('#admin-auth-view'),
    adminAuthForm: $('#admin-auth-form'),
    adminAuthKey: $('#admin-auth-key'),
    adminAuthError: $('#admin-auth-error'),
    adminControls: $('#admin-controls'),
    activeAdminKey: $('#active-admin-key'),
    copyAdminKey: $('#copy-admin-key'),
    passwordForm: $('#password-form'),
    newRoomPassword: $('#new-room-password'),
    adminPeopleList: $('#admin-people-list'),
    adminStatus: $('#admin-status'),
    closeRoom: $('#close-room'),
    confirmDialog: $('#confirm-dialog'),
    confirmTitle: $('#confirm-title'),
    cancelClose: $('#cancel-close'),
    confirmClose: $('#confirm-close'),
    connectionNote: $('#connection-note'),
  };

  const hasMediaSupport = Boolean(navigator.mediaDevices?.getUserMedia);

  function initials(name) {
    const value = String(name || '').trim();
    if (!value) return '你';
    const parts = value.split(/\s+/).filter(Boolean);
    return (parts.length > 1 ? parts[0][0] + parts.at(-1)[0] : [...value].slice(0, 2).join('')).toUpperCase();
  }

  function randomToken(length = 20) {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return [...bytes].map((value) => alphabet[value % alphabet.length]).join('');
  }

  function generateRoomCode() {
    const token = randomToken(8);
    return `${token.slice(0, 4)}-${token.slice(4)}`;
  }

  function normalizeRoomCode(value) {
    return String(value || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 24);
  }

  function roomHostId(roomCode) {
    return `chenjinfu-meetingroom-${roomCode.toLowerCase()}`;
  }

  function setStatus(message, isError = true) {
    elements.status.textContent = message;
    elements.status.style.color = isError ? 'var(--danger)' : 'var(--green)';
  }

  function setRoomMessage(message, isError = false) {
    elements.roomMessage.textContent = message;
    elements.roomMessage.style.color = isError ? 'var(--danger)' : 'var(--muted)';
  }

  function setAdminStatus(message, isError = false) {
    elements.adminStatus.textContent = message;
    elements.adminStatus.style.color = isError ? 'var(--danger)' : 'var(--green)';
  }

  async function apiRequest(path, options = {}) {
    const response = await fetch(`${API_BASE}${path}`, {
      cache: 'no-store',
      ...options,
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    });
    if (!response.ok) throw new Error('ServiceUnavailable');
    return response.json();
  }

  function syncServiceUI() {
    if (!state.serviceReady) {
      elements.joinButton.disabled = true;
      elements.connectionNote.innerHTML = '<span aria-hidden="true">●</span> 正在连接服务';
      setStatus('正在检查会议服务状态…', false);
      state.serviceMessageActive = true;
      return;
    }
    if (!state.serviceEnabled) {
      elements.joinButton.disabled = true;
      elements.connectionNote.innerHTML = '<span aria-hidden="true" style="color:var(--danger)">●</span> 服务已暂停';
      setStatus('Meetingroom 目前暂停开放，暂时不能创建或加入会议。');
      state.serviceMessageActive = true;
      return;
    }
    elements.joinButton.disabled = state.connecting;
    elements.connectionNote.innerHTML = '<span aria-hidden="true">●</span> 点对点加密';
    if (state.serviceMessageActive) setStatus('');
    state.serviceMessageActive = false;
  }

  async function refreshServiceStatus() {
    try {
      const result = await apiRequest('/api/status', { method: 'GET', headers: {} });
      state.serviceEnabled = result.enabled === true;
      state.serviceReady = true;
    } catch (_) {
      state.serviceEnabled = false;
      state.serviceReady = false;
      elements.joinButton.disabled = true;
      elements.connectionNote.innerHTML = '<span aria-hidden="true" style="color:var(--danger)">●</span> 服务不可用';
      setStatus('暂时无法连接会议服务，请稍后刷新页面。');
      state.serviceMessageActive = true;
      return false;
    }
    syncServiceUI();
    return state.serviceEnabled;
  }

  async function requireServiceAvailable() {
    const enabled = await refreshServiceStatus();
    if (!enabled) {
      const error = new Error('ServiceDisabled');
      error.userMessage = state.serviceReady
        ? 'Meetingroom 目前暂停开放。'
        : '暂时无法连接会议服务，请稍后重试。';
      throw error;
    }
  }

  async function sendHostHeartbeat() {
    if (!state.isHost || !state.joined || state.heartbeatInFlight) return;
    state.heartbeatInFlight = true;
    try {
      const result = await apiRequest('/api/rooms/heartbeat', {
        method: 'POST',
        body: JSON.stringify({
          roomCode: state.roomCode,
          instanceId: state.roomInstanceId,
          participantCount: state.participants.size,
          passwordRequired: Boolean(state.roomPassword),
        }),
      });
      if (!result.enabled || result.closeRequested) {
        stopHostHeartbeat(false);
        closeRoomForEveryone(
          result.enabled
            ? '后台管理员已关闭这个房间。'
            : '管理员已关闭 Meetingroom，会议已经结束。',
        );
      }
    } catch (_) {
      setRoomMessage('后台状态暂时无法同步，会议连接不受影响。', true);
    } finally {
      state.heartbeatInFlight = false;
    }
  }

  function startHostHeartbeat() {
    stopHostHeartbeat(false);
    void sendHostHeartbeat();
    state.heartbeatTimer = window.setInterval(sendHostHeartbeat, HEARTBEAT_INTERVAL);
  }

  function stopHostHeartbeat(notify = true) {
    if (state.heartbeatTimer) window.clearInterval(state.heartbeatTimer);
    state.heartbeatTimer = null;
    if (notify && state.isHost && state.joined && state.roomCode && state.roomInstanceId) {
      void fetch(`${API_BASE}/api/rooms/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ roomCode: state.roomCode, instanceId: state.roomInstanceId }),
        keepalive: true,
      }).catch(() => {});
    }
  }

  function mediaErrorMessage(error, kind) {
    if (!hasMediaSupport) return '当前浏览器不支持音视频设备访问，请使用最新版 Chrome、Edge、Firefox 或 Safari。';
    if (error?.name === 'NotAllowedError') return `浏览器没有获得${kind}权限。请在地址栏旁的权限设置中允许后再试。`;
    if (error?.name === 'NotFoundError') return `没有找到可用的${kind}设备。请连接设备后再试。`;
    if (error?.name === 'NotReadableError') return `${kind}可能正在被其他应用占用。关闭其他通话应用后再试。`;
    return `无法启动${kind}。请检查设备连接和浏览器权限。`;
  }

  function peerErrorMessage(error) {
    if (error?.type === 'unavailable-id') return '这个房间号已经有人使用。请选择“加入会议”，或换一个房间号。';
    if (error?.type === 'peer-unavailable') return '没有找到这个房间。请检查房间号，或请房主先创建会议。';
    if (error?.type === 'network' || error?.type === 'server-error' || error?.type === 'socket-error') return '无法连接会议服务。请检查网络后重试。';
    return '连接会议室失败，请稍后重试。';
  }

  function stopStream(stream) {
    stream?.getTracks().forEach((track) => track.stop());
  }

  function localMediaStream() {
    const stream = new MediaStream();
    state.audioStream?.getAudioTracks().filter((track) => track.readyState === 'live').forEach((track) => stream.addTrack(track));
    state.videoStream?.getVideoTracks().filter((track) => track.readyState === 'live').forEach((track) => stream.addTrack(track));
    return stream;
  }

  function localParticipant() {
    return {
      id: state.peer?.id || 'self',
      name: state.displayName,
      microphoneOn: state.microphoneOn,
      cameraOn: state.cameraOn,
      isAdmin: state.isAdmin,
      isHost: state.isHost,
    };
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
    elements.selfMediaStatus.textContent = state.microphoneOn ? '麦克风开启' : '麦克风关闭';
    elements.testStatus.textContent = state.microphoneOn
      ? (state.testing ? '请正常说一句话，我们正在检测音量。' : '麦克风已开启，可以开始测试。')
      : '开启麦克风后，可以做一次声音测试。';
    if (state.joined && state.peer?.id) {
      state.participants.set(state.peer.id, localParticipant());
      renderParticipants();
    }
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
      audio: deviceId ? { deviceId: { exact: deviceId }, echoCancellation: true, noiseSuppression: true, autoGainControl: true } : { echoCancellation: true, noiseSuppression: true, autoGainControl: true },
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

  async function afterMediaChange() {
    if (!state.joined) return;
    publishMediaState();
    await refreshMediaCalls();
  }

  async function toggleMicrophone() {
    setStatus('');
    try {
      if (state.microphoneOn) disableMicrophone();
      else await enableMicrophone();
      await afterMediaChange();
    } catch (error) {
      state.microphoneOn = false;
      syncMediaUI();
      setStatus(mediaErrorMessage(error, '麦克风'));
      setRoomMessage(mediaErrorMessage(error, '麦克风'), true);
    }
  }

  async function toggleCamera() {
    setStatus('');
    try {
      if (state.cameraOn) disableCamera();
      else await enableCamera();
      await afterMediaChange();
    } catch (error) {
      state.cameraOn = false;
      syncMediaUI();
      setStatus(mediaErrorMessage(error, '摄像头'));
      setRoomMessage(mediaErrorMessage(error, '摄像头'), true);
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
    if (state.testing) return finishMicTest(true);
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

  function setMode(mode) {
    state.mode = mode;
    const creating = mode === 'create';
    elements.joinMode.setAttribute('aria-selected', String(!creating));
    elements.createMode.setAttribute('aria-selected', String(creating));
    elements.adminKeyField.hidden = !creating;
    elements.setupEyebrow.textContent = creating ? '创建会议' : '加入会议';
    elements.setupTitle.textContent = creating ? '创建一个新的会议室。' : '准备好后，进入会议室。';
    elements.setupIntro.textContent = creating ? '设置房间号、密码和管理员密钥，然后邀请其他人加入。' : '输入房间号和显示名称；如果房间设有密码，也请一并填写。';
    elements.joinButton.firstChild.textContent = creating ? '创建会议 ' : '加入会议 ';
    if (creating) {
      if (!elements.roomCode.value) elements.roomCode.value = generateRoomCode();
      if (!elements.adminKey.value) elements.adminKey.value = randomToken(24);
    }
    setStatus('');
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

  function updateRoomCode() {
    const normalized = normalizeRoomCode(elements.roomCode.value);
    if (elements.roomCode.value !== normalized) elements.roomCode.value = normalized;
    if (/^[A-Z0-9][A-Z0-9-]{2,23}$/.test(normalized)) {
      elements.roomCode.removeAttribute('aria-invalid');
      elements.roomError.hidden = true;
    }
  }

  function validateSetup() {
    const name = elements.name.value.trim();
    const roomCode = normalizeRoomCode(elements.roomCode.value);
    let valid = true;
    if (!name) {
      elements.name.setAttribute('aria-invalid', 'true');
      elements.nameError.hidden = false;
      valid = false;
    }
    if (!/^[A-Z0-9][A-Z0-9-]{2,23}$/.test(roomCode)) {
      elements.roomCode.setAttribute('aria-invalid', 'true');
      elements.roomError.hidden = false;
      valid = false;
    }
    if (state.mode === 'create' && elements.adminKey.value.trim().length < 8) {
      setStatus('管理员密钥至少需要 8 个字符。');
      valid = false;
    }
    if (!valid) (name ? elements.roomCode : elements.name).focus();
    return valid;
  }

  function bindPeerEvents(peer, rejectOpening) {
    peer.on('connection', (connection) => {
      if (state.isHost && state.joined) handleIncomingDataConnection(connection);
      else connection.close();
    });
    peer.on('call', handleIncomingCall);
    peer.on('error', (error) => {
      if (rejectOpening && !state.joined) rejectOpening(error);
      if (state.pendingJoin) {
        state.pendingJoin.reject(error);
        state.pendingJoin = null;
      } else if (state.joined) {
        setRoomMessage(peerErrorMessage(error), true);
      }
    });
    peer.on('disconnected', () => {
      if (!state.intentionalExit && state.joined) {
        elements.roomState.innerHTML = '<span aria-hidden="true">●</span> 正在重连';
        try { peer.reconnect(); } catch (_) { setRoomMessage('连接中断，请刷新页面重新加入。', true); }
      }
    });
  }

  function openPeer(id) {
    return new Promise((resolve, reject) => {
      if (!window.Peer) return reject(new Error('PeerLibraryUnavailable'));
      let settled = false;
      const peer = new window.Peer(id, { debug: 1 });
      state.peer = peer;
      bindPeerEvents(peer, (error) => {
        if (!settled) {
          settled = true;
          reject(error);
        }
      });
      peer.on('open', (peerId) => {
        if (settled) return;
        settled = true;
        resolve(peerId);
      });
    });
  }

  function safeSend(connection, message) {
    try {
      if (connection?.open) connection.send(message);
    } catch (_) {
      // The close event owns cleanup.
    }
  }

  function broadcast(message, exceptPeer = '') {
    state.dataConnections.forEach((connection, peerId) => {
      if (peerId !== exceptPeer) safeSend(connection, message);
    });
  }

  function rejectConnection(connection, reason, message) {
    safeSend(connection, { type: 'rejected', reason, message });
    window.setTimeout(() => connection.close(), 120);
  }

  function handleIncomingDataConnection(connection) {
    let admitted = false;
    connection.on('data', (message) => {
      if (!message || typeof message !== 'object') return;
      if (!admitted) {
        if (message.type !== 'join' || message.roomCode !== state.roomCode) return rejectConnection(connection, 'invalid', '加入请求无效。');
        if (state.kickedPeers.has(connection.peer)) return rejectConnection(connection, 'kicked', '你已被管理员移出本次会议。');
        if (state.participants.size >= ROOM_LIMIT) return rejectConnection(connection, 'full', '房间已满。');
        if (String(message.password || '') !== state.roomPassword) return rejectConnection(connection, 'password', '房间密码不正确。');
        admitted = true;
        const participant = {
          id: connection.peer,
          name: String(message.name || '访客').trim().slice(0, 40) || '访客',
          microphoneOn: Boolean(message.microphoneOn),
          cameraOn: Boolean(message.cameraOn),
          isAdmin: false,
          isHost: false,
        };
        state.dataConnections.set(connection.peer, connection);
        state.participants.set(connection.peer, participant);
        broadcast({ type: 'participant-joined', participant }, connection.peer);
        safeSend(connection, {
          type: 'accepted',
          roomCode: state.roomCode,
          participants: [...state.participants.values()],
          passwordRequired: Boolean(state.roomPassword),
        });
        renderParticipants();
        setRoomMessage(`${participant.name} 已加入会议。`);
        return;
      }
      handleHostCommand(connection.peer, message);
    });
    connection.on('close', () => {
      if (admitted) removeParticipant(connection.peer, true);
    });
    connection.on('error', () => {
      if (admitted) removeParticipant(connection.peer, true);
    });
  }

  function handleHostCommand(senderId, message) {
    const sender = state.participants.get(senderId);
    if (!sender) return;
    if (message.type === 'leave') return removeParticipant(senderId, true);
    if (message.type === 'media-state') {
      sender.microphoneOn = Boolean(message.microphoneOn);
      sender.cameraOn = Boolean(message.cameraOn);
      state.participants.set(senderId, sender);
      broadcast({ type: 'participant-updated', participant: sender }, senderId);
      renderParticipants();
      return;
    }
    if (message.type === 'admin-auth') {
      const granted = String(message.key || '') === state.adminKey;
      if (granted) {
        sender.isAdmin = true;
        state.participants.set(senderId, sender);
        safeSend(state.dataConnections.get(senderId), { type: 'admin-granted' });
        broadcast({ type: 'participant-updated', participant: sender });
        renderParticipants();
      } else {
        safeSend(state.dataConnections.get(senderId), { type: 'admin-denied' });
      }
      return;
    }
    if (message.type !== 'admin-command' || !sender.isAdmin) return;
    if (message.action === 'set-password') {
      state.roomPassword = String(message.password || '').slice(0, 64);
      broadcast({ type: 'room-security', passwordRequired: Boolean(state.roomPassword) });
      safeSend(state.dataConnections.get(senderId), { type: 'admin-result', message: state.roomPassword ? '房间密码已更新。' : '房间密码已移除。' });
    } else if (message.action === 'kick') {
      kickParticipant(String(message.targetId || ''));
    } else if (message.action === 'close') {
      closeRoomForEveryone();
    }
  }

  function connectToHost() {
    return new Promise((resolve, reject) => {
      const connection = state.peer.connect(roomHostId(state.roomCode), { reliable: true, serialization: 'json' });
      state.hostConnection = connection;
      const timer = window.setTimeout(() => {
        if (state.pendingJoin) {
          state.pendingJoin = null;
          reject(new Error('JoinTimeout'));
          connection.close();
        }
      }, JOIN_TIMEOUT);
      state.pendingJoin = {
        resolve: (message) => { window.clearTimeout(timer); resolve(message); },
        reject: (error) => { window.clearTimeout(timer); reject(error); },
      };
      connection.on('open', () => safeSend(connection, {
        type: 'join',
        roomCode: state.roomCode,
        name: state.displayName,
        password: state.roomPassword,
        microphoneOn: state.microphoneOn,
        cameraOn: state.cameraOn,
      }));
      connection.on('data', handleHostMessage);
      connection.on('error', (error) => {
        if (state.pendingJoin) {
          state.pendingJoin.reject(error);
          state.pendingJoin = null;
        }
      });
      connection.on('close', () => {
        if (state.pendingJoin) {
          state.pendingJoin.reject(new Error('HostUnavailable'));
          state.pendingJoin = null;
        } else if (state.joined && !state.intentionalExit) {
          finishMeeting('房主已离开或连接已中断，会议已经结束。', true);
        }
      });
    });
  }

  function handleHostMessage(message) {
    if (!message || typeof message !== 'object') return;
    if (message.type === 'accepted') {
      state.participants.clear();
      message.participants.forEach((participant) => state.participants.set(participant.id, participant));
      state.participants.set(state.peer.id, localParticipant());
      state.pendingJoin?.resolve(message);
      state.pendingJoin = null;
      return;
    }
    if (message.type === 'rejected') {
      const error = new Error(message.message || '无法加入会议。');
      error.userMessage = message.message;
      state.pendingJoin?.reject(error);
      state.pendingJoin = null;
      return;
    }
    if (message.type === 'participant-joined' || message.type === 'participant-updated') {
      state.participants.set(message.participant.id, message.participant);
      ensureParticipantTile(message.participant);
      renderParticipants();
      if (message.type === 'participant-joined') setRoomMessage(`${message.participant.name} 已加入会议。`);
      return;
    }
    if (message.type === 'participant-left') {
      removeParticipant(message.peerId, false);
      return;
    }
    if (message.type === 'admin-granted') {
      state.isAdmin = true;
      state.adminKey = elements.adminAuthKey.value;
      const self = state.participants.get(state.peer.id) || localParticipant();
      self.isAdmin = true;
      state.participants.set(state.peer.id, self);
      elements.adminAuthError.hidden = true;
      showAdminControls();
      renderParticipants();
      setAdminStatus('管理员权限已开启。');
      return;
    }
    if (message.type === 'admin-denied') {
      elements.adminAuthError.hidden = false;
      setAdminStatus('管理员密钥不正确。', true);
      return;
    }
    if (message.type === 'admin-result') return setAdminStatus(message.message || '操作已完成。');
    if (message.type === 'room-security') return setRoomMessage(message.passwordRequired ? '房主已更新房间密码。' : '房主已移除房间密码。');
    if (message.type === 'kicked') return finishMeeting('你已被管理员移出会议。', true);
    if (message.type === 'room-closed') return finishMeeting('管理员已关闭房间，本次会议结束。', true);
  }

  function handleIncomingCall(call) {
    if (!state.joined || call.metadata?.roomCode !== state.roomCode) return call.close();
    const participant = state.participants.get(call.peer) || {
      id: call.peer,
      name: String(call.metadata?.name || '参会者').slice(0, 40),
      microphoneOn: true,
      cameraOn: true,
      isAdmin: false,
      isHost: false,
    };
    state.participants.set(call.peer, participant);
    const previous = state.mediaCalls.get(call.peer);
    if (previous && previous !== call) previous.close();
    call.answer(localMediaStream());
    attachMediaCall(call);
    ensureParticipantTile(participant);
    renderParticipants();
  }

  function attachMediaCall(call) {
    state.mediaCalls.set(call.peer, call);
    call.on('stream', (stream) => {
      state.remoteStreams.set(call.peer, stream);
      const tile = ensureParticipantTile(state.participants.get(call.peer));
      const video = tile?.querySelector('video');
      if (video) {
        video.srcObject = stream;
        video.play().catch(() => setRoomMessage('点击页面任意位置即可播放参会者声音。'));
      }
      updateParticipantTile(call.peer);
    });
    call.on('close', () => {
      if (state.mediaCalls.get(call.peer) !== call) return;
      state.mediaCalls.delete(call.peer);
      state.remoteStreams.delete(call.peer);
      const tile = elements.participantGrid.querySelector(`[data-peer="${CSS.escape(call.peer)}"]`);
      if (tile) {
        tile.classList.remove('has-video');
        const video = tile.querySelector('video');
        if (video) video.srcObject = null;
      }
    });
    call.on('error', () => setRoomMessage('一位参会者的音视频连接中断，正在等待重连。', true));
  }

  function callParticipant(peerId) {
    if (!state.peer || peerId === state.peer.id || !state.participants.has(peerId)) return;
    const previous = state.mediaCalls.get(peerId);
    if (previous) previous.close();
    const call = state.peer.call(peerId, localMediaStream(), { metadata: { roomCode: state.roomCode, name: state.displayName } });
    if (call) attachMediaCall(call);
  }

  async function refreshMediaCalls() {
    if (!state.joined) return;
    [...state.participants.keys()].filter((peerId) => peerId !== state.peer.id).forEach(callParticipant);
  }

  function publishMediaState() {
    const message = { type: 'media-state', microphoneOn: state.microphoneOn, cameraOn: state.cameraOn };
    if (state.isHost) {
      state.participants.set(state.peer.id, localParticipant());
      broadcast({ type: 'participant-updated', participant: localParticipant() });
      renderParticipants();
    } else {
      safeSend(state.hostConnection, message);
    }
  }

  function ensureParticipantTile(participant) {
    if (!participant || participant.id === state.peer?.id) return elements.selfTile;
    let tile = elements.participantGrid.querySelector(`[data-peer="${CSS.escape(participant.id)}"]`);
    if (!tile) {
      tile = elements.tileTemplate.content.firstElementChild.cloneNode(true);
      tile.dataset.peer = participant.id;
      tile.querySelector('video').setAttribute('aria-label', `${participant.name} 的音视频`);
      elements.participantGrid.append(tile);
    }
    updateParticipantTile(participant.id);
    return tile;
  }

  function updateParticipantTile(peerId) {
    const participant = state.participants.get(peerId);
    if (!participant) return;
    const tile = peerId === state.peer?.id ? elements.selfTile : elements.participantGrid.querySelector(`[data-peer="${CSS.escape(peerId)}"]`);
    if (!tile) return;
    tile.querySelector('.room-avatar').textContent = initials(participant.name);
    tile.querySelector('.self-name').textContent = `${participant.name}${peerId === state.peer?.id ? '（你）' : ''}`;
    tile.querySelector('.media-badge').textContent = participant.microphoneOn ? '麦克风开启' : '麦克风关闭';
    const stream = state.remoteStreams.get(peerId);
    tile.classList.toggle('has-video', participant.cameraOn && Boolean(stream?.getVideoTracks().length));
  }

  function personRow(participant, adminView = false) {
    const row = document.createElement('li');
    row.className = 'person-row';
    const avatar = document.createElement('span');
    avatar.className = 'person-avatar';
    avatar.textContent = initials(participant.name);
    const copy = document.createElement('span');
    copy.className = 'person-copy';
    const name = document.createElement('strong');
    name.textContent = `${participant.name}${participant.id === state.peer?.id ? '（你）' : ''}`;
    const detail = document.createElement('small');
    detail.textContent = participant.isHost ? '房主' : (participant.microphoneOn ? '麦克风开启' : '麦克风关闭');
    copy.append(name, detail);
    row.append(avatar, copy);
    if (participant.isAdmin) {
      const badge = document.createElement('span');
      badge.className = 'admin-chip';
      badge.textContent = '管理员';
      row.append(badge);
    }
    if (adminView && participant.id !== state.peer?.id && !participant.isHost) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'kick-button';
      button.dataset.kick = participant.id;
      button.textContent = '踢出';
      row.append(button);
    }
    return row;
  }

  function renderParticipants() {
    if (!state.peer) return;
    const participants = [...state.participants.values()];
    elements.participantCount.textContent = `${participants.length} / ${ROOM_LIMIT}`;
    elements.peopleList.replaceChildren(...participants.map((participant) => personRow(participant)));
    elements.adminPeopleList.replaceChildren(...participants.map((participant) => personRow(participant, true)));
    participants.forEach(ensureParticipantTile);
    [...elements.participantGrid.querySelectorAll('.participant-tile[data-peer]')].forEach((tile) => {
      const peerId = tile.dataset.peer === 'self' ? state.peer.id : tile.dataset.peer;
      if (!state.participants.has(peerId)) tile.remove();
    });
    updateParticipantTile(state.peer.id);
  }

  function removeParticipant(peerId, announce) {
    const participant = state.participants.get(peerId);
    state.participants.delete(peerId);
    const connection = state.dataConnections.get(peerId);
    state.dataConnections.delete(peerId);
    if (connection?.open) connection.close();
    const call = state.mediaCalls.get(peerId);
    state.mediaCalls.delete(peerId);
    if (call) call.close();
    state.remoteStreams.delete(peerId);
    elements.participantGrid.querySelector(`[data-peer="${CSS.escape(peerId)}"]`)?.remove();
    if (state.isHost && announce) broadcast({ type: 'participant-left', peerId });
    renderParticipants();
    if (participant && announce) setRoomMessage(`${participant.name} 已离开会议。`);
  }

  function showRoom() {
    state.joined = true;
    state.intentionalExit = false;
    elements.roomName.textContent = state.displayName;
    elements.selfName.textContent = `${state.displayName}（你）`;
    elements.roomAvatar.textContent = initials(state.displayName);
    elements.selfTile.dataset.peer = state.peer.id;
    elements.activeRoomCode.textContent = state.roomCode;
    elements.roomState.innerHTML = `<span aria-hidden="true">●</span> ${state.isHost ? '房间已开启' : '已连接'}`;
    elements.connectionNote.innerHTML = '<span aria-hidden="true">●</span> 点对点加密';
    elements.setupView.hidden = true;
    elements.roomView.hidden = false;
    elements.openAdmin.textContent = state.isAdmin ? '房间管理' : '管理员登录';
    state.participants.set(state.peer.id, localParticipant());
    renderParticipants();
    syncMediaUI();
    document.title = `${state.roomCode} · Meetingroom`;
    history.replaceState(null, '', `${location.pathname}?room=${encodeURIComponent(state.roomCode)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function createRoom() {
    await requireServiceAvailable();
    state.isHost = true;
    state.isAdmin = true;
    state.adminKey = elements.adminKey.value.trim();
    state.roomPassword = elements.roomPassword.value;
    state.roomInstanceId = randomToken(32);
    await openPeer(roomHostId(state.roomCode));
    state.participants.clear();
    state.participants.set(state.peer.id, localParticipant());
    showRoom();
    startHostHeartbeat();
    setRoomMessage('房间已经开启。复制邀请链接，请其他人加入。');
  }

  async function joinExistingRoom() {
    await requireServiceAvailable();
    state.isHost = false;
    state.isAdmin = false;
    await openPeer(undefined);
    const message = await connectToHost();
    showRoom();
    message.participants.filter((participant) => participant.id !== state.peer.id).forEach((participant) => {
      ensureParticipantTile(participant);
      callParticipant(participant.id);
    });
    setRoomMessage('你已加入会议。');
  }

  async function submitSetup(event) {
    event.preventDefault();
    if (!validateSetup()) return;
    if (!window.Peer) return setStatus('会议连接组件加载失败。请检查网络并刷新页面。');
    state.connecting = true;
    elements.joinButton.disabled = true;
    setStatus(state.mode === 'create' ? '正在创建会议室…' : '正在连接会议室…', false);
    state.displayName = elements.name.value.trim();
    state.roomCode = normalizeRoomCode(elements.roomCode.value);
    state.roomPassword = elements.roomPassword.value;
    state.intentionalExit = false;
    try {
      if (state.mode === 'create') await createRoom();
      else await joinExistingRoom();
      setStatus('');
    } catch (error) {
      cleanupPeerOnly();
      setStatus(error.userMessage || (error.message === 'JoinTimeout' || error.message === 'HostUnavailable' ? '连接房间超时。请确认房主仍在线，然后重试。' : peerErrorMessage(error)));
    } finally {
      state.connecting = false;
      syncServiceUI();
    }
  }

  function cleanupPeerOnly() {
    stopHostHeartbeat(state.isHost && state.joined);
    state.intentionalExit = true;
    state.hostConnection?.close();
    state.hostConnection = null;
    state.dataConnections.forEach((connection) => connection.close());
    state.dataConnections.clear();
    state.mediaCalls.forEach((call) => call.close());
    state.mediaCalls.clear();
    state.remoteStreams.clear();
    state.peer?.destroy();
    state.peer = null;
    state.pendingJoin = null;
    state.joined = false;
    state.roomInstanceId = '';
  }

  function finishMeeting(message, isError = false) {
    cleanupPeerOnly();
    state.participants.clear();
    state.isHost = false;
    state.isAdmin = false;
    elements.roomView.hidden = true;
    elements.setupView.hidden = false;
    elements.adminDialog.close();
    elements.confirmDialog.close();
    setStatus(message, isError);
    document.title = 'Meetingroom · 视频会议';
    history.replaceState(null, '', `${location.pathname}?room=${encodeURIComponent(state.roomCode)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function leaveMeeting() {
    if (state.isHost) {
      elements.confirmTitle.textContent = '离开并结束会议？';
      elements.confirmDialog.showModal();
      return;
    }
    safeSend(state.hostConnection, { type: 'leave' });
    finishMeeting('你已离开会议，设备设置仍然保留。');
  }

  function kickParticipant(peerId) {
    if (!state.isHost) return safeSend(state.hostConnection, { type: 'admin-command', action: 'kick', targetId: peerId });
    const participant = state.participants.get(peerId);
    if (!participant || participant.isHost) return;
    state.kickedPeers.add(peerId);
    safeSend(state.dataConnections.get(peerId), { type: 'kicked' });
    window.setTimeout(() => removeParticipant(peerId, true), 100);
    setAdminStatus(`${participant.name} 已被移出会议。`);
  }

  function closeRoomForEveryone(message = '房间已关闭。') {
    if (!state.isHost) return safeSend(state.hostConnection, { type: 'admin-command', action: 'close' });
    broadcast({ type: 'room-closed' });
    window.setTimeout(() => finishMeeting(message), 180);
  }

  function showAdminControls() {
    elements.adminAuthView.hidden = true;
    elements.adminControls.hidden = false;
    elements.activeAdminKey.value = state.adminKey;
    elements.openAdmin.textContent = '房间管理';
    renderParticipants();
  }

  function openAdminDialog() {
    setAdminStatus('');
    elements.adminAuthError.hidden = true;
    if (state.isAdmin) showAdminControls();
    else {
      elements.adminAuthView.hidden = false;
      elements.adminControls.hidden = true;
      elements.adminAuthKey.value = '';
    }
    elements.adminDialog.showModal();
  }

  function authenticateAdmin(event) {
    event.preventDefault();
    const key = elements.adminAuthKey.value;
    if (!key) return;
    safeSend(state.hostConnection, { type: 'admin-auth', key });
    setAdminStatus('正在验证…');
  }

  function updateRoomPassword(event) {
    event.preventDefault();
    const password = elements.newRoomPassword.value;
    if (state.isHost) {
      state.roomPassword = password;
      broadcast({ type: 'room-security', passwordRequired: Boolean(password) });
      setAdminStatus(password ? '房间密码已更新。' : '房间密码已移除。');
    } else {
      safeSend(state.hostConnection, { type: 'admin-command', action: 'set-password', password });
      setAdminStatus('正在保存…');
    }
    elements.newRoomPassword.value = '';
  }

  async function copyInvite() {
    const url = new URL(location.href);
    url.search = '';
    url.searchParams.set('room', state.roomCode);
    try {
      await navigator.clipboard.writeText(url.toString());
      setRoomMessage('邀请链接已复制。');
    } catch (_) {
      window.prompt('复制这个邀请链接：', url.toString());
    }
  }

  async function copyAdminKey() {
    try {
      await navigator.clipboard.writeText(state.adminKey);
      setAdminStatus('管理员密钥已复制。');
    } catch (_) {
      window.prompt('复制管理员密钥：', state.adminKey);
    }
  }

  function playRemoteMedia() {
    elements.participantGrid.querySelectorAll('video').forEach((video) => video.play().catch(() => {}));
  }

  elements.joinMode.addEventListener('click', () => setMode('join'));
  elements.createMode.addEventListener('click', () => setMode('create'));
  elements.generateKey.addEventListener('click', () => { elements.adminKey.value = randomToken(24); });
  elements.name.addEventListener('input', updateIdentity);
  elements.roomCode.addEventListener('input', updateRoomCode);
  elements.form.addEventListener('submit', submitSetup);
  elements.micToggle.addEventListener('click', toggleMicrophone);
  elements.previewMic.addEventListener('click', toggleMicrophone);
  elements.roomMic.addEventListener('click', toggleMicrophone);
  elements.cameraToggle.addEventListener('click', toggleCamera);
  elements.previewCamera.addEventListener('click', toggleCamera);
  elements.roomCamera.addEventListener('click', toggleCamera);
  elements.testMic.addEventListener('click', startMicTest);
  elements.leaveRoom.addEventListener('click', leaveMeeting);
  elements.copyInvite.addEventListener('click', copyInvite);
  elements.copyAdminKey.addEventListener('click', copyAdminKey);
  elements.openAdmin.addEventListener('click', openAdminDialog);
  elements.adminAuthForm.addEventListener('submit', authenticateAdmin);
  elements.passwordForm.addEventListener('submit', updateRoomPassword);
  elements.adminPeopleList.addEventListener('click', (event) => {
    const button = event.target.closest('[data-kick]');
    if (button) kickParticipant(button.dataset.kick);
  });
  elements.closeRoom.addEventListener('click', () => {
    elements.confirmTitle.textContent = '关闭这个房间？';
    elements.confirmDialog.showModal();
  });
  elements.cancelClose.addEventListener('click', () => elements.confirmDialog.close());
  elements.confirmClose.addEventListener('click', () => {
    elements.confirmDialog.close();
    if (state.isHost) closeRoomForEveryone();
    else safeSend(state.hostConnection, { type: 'admin-command', action: 'close' });
  });
  elements.participantGrid.addEventListener('click', playRemoteMedia);
  elements.micSelect.addEventListener('change', async () => {
    if (!state.microphoneOn) return;
    try { await enableMicrophone(); await afterMediaChange(); } catch (error) { setStatus(mediaErrorMessage(error, '麦克风')); }
  });
  elements.cameraSelect.addEventListener('change', async () => {
    if (!state.cameraOn) return;
    try { await enableCamera(); await afterMediaChange(); } catch (error) { setStatus(mediaErrorMessage(error, '摄像头')); }
  });
  navigator.mediaDevices?.addEventListener?.('devicechange', listDevices);

  const invitedRoom = normalizeRoomCode(new URLSearchParams(location.search).get('room'));
  if (invitedRoom) elements.roomCode.value = invitedRoom;
  else elements.roomCode.value = generateRoomCode();
  elements.adminKey.value = randomToken(24);
  updateIdentity();
  updateRoomCode();
  syncMediaUI();
  syncServiceUI();
  void refreshServiceStatus().then(() => {
    if (!hasMediaSupport && state.serviceEnabled) setStatus('当前浏览器不支持音视频设备访问。');
  });

  window.addEventListener('pagehide', () => {
    if (state.isHost && state.joined) broadcast({ type: 'room-closed' });
    stopHostHeartbeat(state.isHost && state.joined);
    state.intentionalExit = true;
    cleanupPeerOnly();
    stopStream(state.audioStream);
    stopStream(state.videoStream);
    teardownAnalyser();
  });
})();
