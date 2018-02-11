const _ = require('lodash');
const request = require('supertest');

async function processRequest(req, reqName, code = 200) {
  try {
    const res = await req.expect(code);
    return res.body;
  } catch (e) {
    throw new Error(`${reqName}: ${e.message}`);
  }
}

function getDatasets() {
  return request(this.app)
    .get('/api/v1/datasets');
}

function getDataset(id) {
  return request(this.app)
    .get(`/api/v1/datasets/${id}`);
}

function createDataset(dataset) {
  return request(this.app)
    .post('/api/v1/datasets')
    .send(dataset);
}

function updateDataset(dataset) {
  return request(this.app)
    .put('/api/v1/datasets')
    .send(dataset);
}

function deleteDataset(id) {
  return request(this.app)
    .delete(`/api/v1/datasets/${id}`);
}

function createToolkit(app) {
  const toolkit = {
    app: app.expressApp,
    processRequest,
    getDatasets,
    getDataset,
    createDataset,
    updateDataset,
    deleteDataset,
  };

  /**
   * For each function getSomething(param1, param2, ...)
   * create a new function getSomethingProc(param1, param2, ..., code)
   * which wraps processRequest(req, reqName, code) around it
   */
  _.forEach(toolkit, (func, key) => {
    if (_.isFunction(func)) {
      // Bind the methods so that this.app becomes available
      toolkit[key] = func.bind(toolkit);

      toolkit[`${key}Proc`] = async function procReq(...args) {
        const params = args.splice(0, func.length);
        const req = toolkit[key](...params);
        return this.processRequest(req, key, ...args);
      };
    }
  });

  return toolkit;
}

module.exports = {
  createToolkit,
};
