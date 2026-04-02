import { useMemo } from 'react';

import { useKubevirtTranslation } from '@kubevirt-utils/hooks/useKubevirtTranslation';
import {
  isVirtualMachineTemplateRequest,
  TemplateOrRequest,
} from '@kubevirt-utils/resources/template';
import { OTHER } from '@kubevirt-utils/utils/constants';
import { getItemNameWithOther, includeFilter } from '@kubevirt-utils/utils/utils';
import { RowFilter, RowFilterItem } from '@openshift-console/dynamic-plugin-sdk';

import { getTemplateProviderName } from '../../utils/selectors';

const getRowProvider = (obj: TemplateOrRequest): string =>
  isVirtualMachineTemplateRequest(obj) ? OTHER : getTemplateProviderName(obj) ?? OTHER;

const useProviderFilter = (): RowFilter<TemplateOrRequest> => {
  const { t } = useKubevirtTranslation();

  const providers: RowFilterItem[] = useMemo(
    () => [
      {
        id: 'Red Hat',
        title: t('Red Hat'),
      },
      {
        id: 'Other',
        title: t('Other'),
      },
    ],
    [t],
  );

  return useMemo(
    () => ({
      filter: (availableTemplateProviders, obj) =>
        includeFilter(availableTemplateProviders, providers, getRowProvider(obj)),
      filterGroupName: t('Provider'),
      items: providers,
      reducer: (obj) => getItemNameWithOther(getRowProvider(obj), providers),
      type: 'provider',
    }),
    [providers, t],
  );
};

export default useProviderFilter;
