import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { TabNavigation } from './TabNavigation.jsx';
import { TABS } from '../../constants.js';

vi.mock('../../utils/eventTracker.js', () => ({
  trackEvent: vi.fn(() => ({ status: 'ok', eventId: 'evt_test' })),
}));

describe('TabNavigation', () => {
  const defaultProps = {
    activeTab: TABS[0].id,
    onTabChange: vi.fn(),
  };

  function renderTabNavigation(props = {}) {
    return render(<TabNavigation {...defaultProps} {...props} />);
  }

  it('renders all tabs defined in TABS constant', () => {
    renderTabNavigation();
    const tabButtons = screen.getAllByRole('tab');
    expect(tabButtons).toHaveLength(TABS.length);
    TABS.forEach((tab) => {
      expect(screen.getByRole('tab', { name: tab.label })).toBeInTheDocument();
    });
  });

  it('active tab has aria-selected set to true', () => {
    renderTabNavigation({ activeTab: TABS[2].id });
    const activeTab = screen.getByRole('tab', { name: TABS[2].label });
    expect(activeTab).toHaveAttribute('aria-selected', 'true');
  });

  it('inactive tabs have aria-selected set to false', () => {
    renderTabNavigation({ activeTab: TABS[0].id });
    TABS.slice(1).forEach((tab) => {
      const tabEl = screen.getByRole('tab', { name: tab.label });
      expect(tabEl).toHaveAttribute('aria-selected', 'false');
    });
  });

  it('active tab has tabIndex 0 and inactive tabs have tabIndex -1', () => {
    renderTabNavigation({ activeTab: TABS[1].id });
    TABS.forEach((tab, index) => {
      const tabEl = screen.getByRole('tab', { name: tab.label });
      if (index === 1) {
        expect(tabEl).toHaveAttribute('tabindex', '0');
      } else {
        expect(tabEl).toHaveAttribute('tabindex', '-1');
      }
    });
  });

  it('active tab has distinct styling classes', () => {
    renderTabNavigation({ activeTab: TABS[0].id });
    const activeTab = screen.getByRole('tab', { name: TABS[0].label });
    expect(activeTab).toHaveClass('text-white');
    expect(activeTab).toHaveClass('border-status-blue');
  });

  it('clicking a tab calls onTabChange with the correct tab ID', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    renderTabNavigation({ activeTab: TABS[0].id, onTabChange });

    await user.click(screen.getByRole('tab', { name: TABS[3].label }));
    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith(TABS[3].id);
  });

  it('clicking the already active tab does not call onTabChange', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    renderTabNavigation({ activeTab: TABS[0].id, onTabChange });

    await user.click(screen.getByRole('tab', { name: TABS[0].label }));
    expect(onTabChange).not.toHaveBeenCalled();
  });

  it('ArrowRight moves focus to the next tab', async () => {
    const user = userEvent.setup();
    renderTabNavigation({ activeTab: TABS[0].id });

    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    firstTab.focus();
    expect(firstTab).toHaveFocus();

    await user.keyboard('{ArrowRight}');
    const secondTab = screen.getByRole('tab', { name: TABS[1].label });
    expect(secondTab).toHaveFocus();
  });

  it('ArrowLeft moves focus to the previous tab', async () => {
    const user = userEvent.setup();
    renderTabNavigation({ activeTab: TABS[1].id });

    const secondTab = screen.getByRole('tab', { name: TABS[1].label });
    secondTab.focus();
    expect(secondTab).toHaveFocus();

    await user.keyboard('{ArrowLeft}');
    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    expect(firstTab).toHaveFocus();
  });

  it('ArrowRight wraps from last tab to first tab', async () => {
    const user = userEvent.setup();
    const lastIndex = TABS.length - 1;
    renderTabNavigation({ activeTab: TABS[lastIndex].id });

    const lastTab = screen.getByRole('tab', { name: TABS[lastIndex].label });
    lastTab.focus();

    await user.keyboard('{ArrowRight}');
    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    expect(firstTab).toHaveFocus();
  });

  it('ArrowLeft wraps from first tab to last tab', async () => {
    const user = userEvent.setup();
    renderTabNavigation({ activeTab: TABS[0].id });

    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    firstTab.focus();

    await user.keyboard('{ArrowLeft}');
    const lastTab = screen.getByRole('tab', { name: TABS[TABS.length - 1].label });
    expect(lastTab).toHaveFocus();
  });

  it('Home key moves focus to the first tab', async () => {
    const user = userEvent.setup();
    renderTabNavigation({ activeTab: TABS[3].id });

    const middleTab = screen.getByRole('tab', { name: TABS[3].label });
    middleTab.focus();

    await user.keyboard('{Home}');
    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    expect(firstTab).toHaveFocus();
  });

  it('End key moves focus to the last tab', async () => {
    const user = userEvent.setup();
    renderTabNavigation({ activeTab: TABS[0].id });

    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    firstTab.focus();

    await user.keyboard('{End}');
    const lastTab = screen.getByRole('tab', { name: TABS[TABS.length - 1].label });
    expect(lastTab).toHaveFocus();
  });

  it('Enter key activates the focused tab', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    renderTabNavigation({ activeTab: TABS[0].id, onTabChange });

    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    firstTab.focus();

    await user.keyboard('{ArrowRight}');
    await user.keyboard('{Enter}');
    expect(onTabChange).toHaveBeenCalledWith(TABS[1].id);
  });

  it('Space key activates the focused tab', async () => {
    const user = userEvent.setup();
    const onTabChange = vi.fn();
    renderTabNavigation({ activeTab: TABS[0].id, onTabChange });

    const firstTab = screen.getByRole('tab', { name: TABS[0].label });
    firstTab.focus();

    await user.keyboard('{ArrowRight}');
    await user.keyboard(' ');
    expect(onTabChange).toHaveBeenCalledWith(TABS[1].id);
  });

  it('renders tablist role on the container', () => {
    renderTabNavigation();
    const tablist = screen.getByRole('tablist');
    expect(tablist).toBeInTheDocument();
    expect(tablist).toHaveAttribute('aria-label', 'Dashboard tabs');
  });

  it('each tab has correct aria-controls attribute', () => {
    renderTabNavigation();
    TABS.forEach((tab) => {
      const tabEl = screen.getByRole('tab', { name: tab.label });
      expect(tabEl).toHaveAttribute('aria-controls', `tabpanel-${tab.id}`);
    });
  });

  it('each tab has correct id attribute', () => {
    renderTabNavigation();
    TABS.forEach((tab) => {
      const tabEl = screen.getByRole('tab', { name: tab.label });
      expect(tabEl).toHaveAttribute('id', `tab-${tab.id}`);
    });
  });

  it('renders navigation landmark with correct aria-label', () => {
    renderTabNavigation();
    const nav = screen.getByRole('navigation', { name: 'Dashboard navigation' });
    expect(nav).toBeInTheDocument();
  });
});