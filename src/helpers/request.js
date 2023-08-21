import axios from 'axios'

export const callPostApi = (key, api, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(api, body, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPostApiAsync = (key, api, body) => {
  return new Promise( async (resolve, reject) => {
      axios.post(api, body, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      })
      .then(result => {
        resolve(result.data.data)
      })
      .catch( error =>{
        reject(null)
      })
  })
}

export const callPostApiWithoutToken = (api, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(api, body, {
        withCredentials: true
      });
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPatchApi = (key, api, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(api, body, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callPutApi = (key, api, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.put(api, body, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callGetApi = (key, api) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(api, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callGetApiWithoutToken = (api) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(api);
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callPatchApiWithoutToken = (api, body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.patch(api, body);
      resolve(res.data)
    } catch (err) {
      reject(null)
    }
  })
}

export const callDeleteApi = (key, api) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(api, {
        headers: {
          'Authorization': `Bearer ${key}`
        }
      });
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}

export const callDeleteApiWithoutToken = (api) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.delete(api);
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}