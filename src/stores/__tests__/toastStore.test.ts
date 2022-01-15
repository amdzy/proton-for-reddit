import { useToastStore, Toast } from '../toastStore';

describe('Toast store', () => {
  it('Add & remove toast', () => {
    const { addToast } = useToastStore.getState();
    const { dismissToast } = useToastStore.getState();

    const toast: Toast = {
      id: '123',
      type: 'error',
      text: 'toast 1',
    };
    addToast(toast);
    expect(useToastStore.getState().toasts).toHaveLength(1);

    dismissToast('123');
    expect(useToastStore.getState().toasts).toHaveLength(0);
  });
});
