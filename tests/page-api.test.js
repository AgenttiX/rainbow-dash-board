const _ = require('lodash');
const BPromise = require('bluebird');
const { expect } = require('chai');
const App = require('../src/app');
const { createToolkit } = require('./utils/toolkit');
const mocks = require('./utils/mocks');
const database = require('./utils/database');

describe('/api/v1/pages', () => {
  let app;
  let toolkit;

  beforeEach(async () => {
    await database.resetDatabase();

    app = new App();
    toolkit = createToolkit(app);
    await app.startAsync();
  });

  afterEach(() => {
    app.close();
  });

  it('should create and return one dataset', async () => {
    const dataset = mocks.generateDataset();
    const createdDataset = await toolkit.createDatasetProc(dataset);
    const retrievedDataset = await toolkit.getDatasetProc(createdDataset.id);

    expect(createdDataset).to.deep.equal(retrievedDataset);
  });

  it('should return multiple datasets', async () => {
    const datasets = _.range(3).map(() => mocks.generateDataset());

    const createdDatasets = await BPromise.map(datasets, dataset =>
      toolkit.createDatasetProc(dataset)
    );

    const retrievedDatasets = await toolkit.getDatasetsProc();

    expect(retrievedDatasets).to.deep.include.members(createdDatasets);

    _.forEach(createdDatasets, createdDataset => {
      expect(retrievedDatasets).to.deep.include(createdDataset);
    });
  });


  it('should update dataset', async () => {
    const newName = 'New name';

    const dataset = mocks.generateDataset();
    const createdDataset = await toolkit.createDatasetProc(dataset);

    expect(createdDataset.name).to.not.equal(newName);

    createdDataset.name = newName;

    await toolkit.updateDatasetProc(createdDataset);
    const retrievedDataset = await toolkit.getDatasetProc(createdDataset.id);

    expect(retrievedDataset.name).to.equal(newName);
  });

  it('should delete dataset', async () => {
    const dataset = mocks.generateDataset();
    const createdDataset = await toolkit.createDatasetProc(dataset);
    await toolkit.deleteDatasetProc(createdDataset.id);
    await toolkit.getDatasetProc(createdDataset.id, 404);
  });
});
