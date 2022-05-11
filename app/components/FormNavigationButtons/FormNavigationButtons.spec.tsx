import { render } from '@testing-library/react';
import FormNavigationButtons from './FormNavigationButtons';

describe('FormNavigationButtons', () => {
  const mockHandlePreviousStep = jest.fn();
  const mockOnSubmitLoading = false;
  describe('mounting', () => {
    it('should mount without error', () => {
      expect(() =>
        render(
          <FormNavigationButtons
            handlePreviousStep={mockHandlePreviousStep}
            onSubmitLoading={mockOnSubmitLoading}
          />
        )
      ).not.toThrow();
    });

    it('should unmount without error', () => {
      const { unmount } = render(
        <FormNavigationButtons
          handlePreviousStep={mockHandlePreviousStep}
          onSubmitLoading={mockOnSubmitLoading}
        />
      );

      expect(() => unmount()).not.toThrow();
    });
  });
});
