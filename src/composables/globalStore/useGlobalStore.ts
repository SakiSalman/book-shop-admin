import type { GlobalInterface } from '@/models/CommonModels';
import { reactive } from 'vue';

let globalState = reactive<GlobalInterface>({
  loading: true,
  user: null,
});

const updateGlobalStore = (value: Partial<GlobalInterface>) => {
  globalState = { ...globalState, ...value };
};

const useGlobalStore = () => {
  return {
    globalState,
    updateGlobalStore,
  };
};

export default useGlobalStore;
