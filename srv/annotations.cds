using { global.finance as model } from '../db/extensions/extend-ext';

annotate model.RegionCatalog with {

  regionName @title: '{i18n>regionservice_country}';

};