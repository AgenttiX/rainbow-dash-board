const _ = require('lodash');
const BPromise = require('bluebird');
const { expect } = require('chai');
const App = require('../src/app');
const { createToolkit } = require('./utils/toolkit');
const mocks = require('./utils/mocks');
const database = require('./utils/database');

describe('/api/v1/datasets', () => {
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


  it('should update whole dataset', async () => {
    const dataset = mocks.generateDataset();
    const newDataset = mocks.generateDataset();

    const createdDataset = await toolkit.createDatasetProc(dataset);

    _.forEach(newDataset, (value, key) => {
      if (key === 'type') return;
      expect(value).to.not.deep.equal(createdDataset[key]);
    });

    await toolkit.updateDatasetProc(createdDataset.id, newDataset);
    const retrievedDataset = await toolkit.getDatasetProc(createdDataset.id);

    expect(retrievedDataset).to.deep.include(newDataset);
  });

  it('should update dataset partially', async () => {
    const newName = 'New name';

    const dataset = mocks.generateDataset();
    const createdDataset = await toolkit.createDatasetProc(dataset);

    expect(createdDataset.name).to.not.equal(newName);

    createdDataset.name = newName;

    await toolkit.updateDatasetProc(createdDataset.id, createdDataset);
    const retrievedDataset = await toolkit.getDatasetProc(createdDataset.id);

    expect(retrievedDataset.name).to.equal(newName);
  });

  it('should delete dataset', async () => {
    const dataset = mocks.generateDataset();
    const createdDataset = await toolkit.createDatasetProc(dataset);
    await toolkit.deleteDatasetProc(createdDataset.id);
    await toolkit.getDatasetProc(createdDataset.id, 404);
  });

  describe('data table', () => {
    it('should create data table for the dataset', async () => {
      const dataset = mocks.generateDataset();
      await toolkit.createDataset(dataset);

      // Returns null on the first row if table `ds_1` is not found
      const response = await database.knex.raw(
        "SELECT to_regclass('public.ds_1');"
      );
      expect(response.rows[0].to_regclass).to.not.equal(null);
    });

    it('should drop created table when dataset is dropped', async () => {
      const dataset = mocks.generateDataset();
      const createdDataset = await toolkit.createDatasetProc(dataset);
      await toolkit.deleteDatasetProc(createdDataset.id);

      // Returns null on the first row if table `ds_1` is not found
      const response = await database.knex.raw(
        "SELECT to_regclass('public.ds_1');"
      );
      expect(response.rows[0].to_regclass).to.equal(null);
    });

    it('should drop created table when migrations are rolled', async () => {
      const dataset = mocks.generateDataset();
      await toolkit.createDataset(dataset);

      await database.rollbackDatabase();

      // Returns null on the first row if table `ds_1` is not found
      const response = await database.knex.raw(
        "SELECT to_regclass('public.ds_1');"
      );
      expect(response.rows[0].to_regclass).to.equal(null);
    });
  });
});
