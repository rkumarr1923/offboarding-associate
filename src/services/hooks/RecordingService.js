import axios from 'axios';

const BASE_URL = 'http://localhost:9094/recording';

class RecordingService {
  getRecordings() {
    return axios.get(BASE_URL + '/get-all-recordings');
  }

  createRecording(recording, headers) {
    return axios.post(BASE_URL + '/add-recording', recording, {
      headers: headers,
    });
  }

  getRecordingById(recordingId) {
    return axios.get(BASE_URL + '/' + recordingId);
  }

  updateRecording(recording, recordingId, headers) {
    return axios.put(BASE_URL + '/' + recordingId, recording, {
      headers: headers,
    });
  }

  deleteRecording(recordingId, headers) {
    return axios.delete(BASE_URL + '/' + recordingId, {
      headers: headers,
    });
  }
}

export default new RecordingService();
