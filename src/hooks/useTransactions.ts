import { get } from 'lodash';

import { en } from 'translations';

type ReturnDataType = {
  i18n: {
    t: (localizedString: string) => string;
    tf: (functionName: string) => (arg1?: string, arg2?: string) => string;
  };
};

export const useTranslations: () => ReturnDataType = () => {
  const t = (stringToTranslate: string) => {
    if (get(en, stringToTranslate)) {
      return get(en, stringToTranslate) as string;
    } else {
      return '! missing translation !';
    }
  };

  const tf = (functionName: string) => {
    if (get(en, functionName)) {
      return get(en, functionName) as (arg1?: string, arg2?: string) => string;
    } else {
      return () => '! missing translation !';
    }
  };

  const returnObject: ReturnDataType = {
    i18n: {
      t,
      tf,
    },
  };

  return returnObject;
};

export default useTranslations;