using {master.data as model} from '../db/master-data-schema';

service MasterDataService {

    entity GlobalSetting             as projection on model.GlobalSetting;

    entity Currency                  as projection on model.Currency;

    entity Region                    as projection on model.Region;

    entity GlobalConfig as projection on model.GlobalConfig;

}
