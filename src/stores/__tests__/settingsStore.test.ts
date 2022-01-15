import { useSettingsStore } from '..';

describe('Settings store', () => {
  it('Change notification settings', () => {
    const notification = useSettingsStore.getState().notifications.enabled;
    const { setNotifications } = useSettingsStore.getState();

    setNotifications();
    expect(useSettingsStore.getState().notifications.enabled).toBe(
      !notification
    );
  });

  it('Change notification interval', () => {
    const setInterval = useSettingsStore.getState().setNotificationsInterval;

    setInterval('1 Min', 1000);

    expect(useSettingsStore.getState().notifications.interval).toEqual({
      value: 1000,
      text: '1 Min',
    });
  });

  it('Change data-saver settings', () => {
    const { dataSaver } = useSettingsStore.getState();
    const { setDataSaver } = useSettingsStore.getState();

    setDataSaver();
    expect(useSettingsStore.getState().dataSaver).toBe(!dataSaver);
  });

  it('Change video settings', () => {
    const { videos } = useSettingsStore.getState();
    const { setVideoSettings } = useSettingsStore.getState();

    setVideoSettings('mute');
    expect(useSettingsStore.getState().videos.mute).toBe(!videos.mute);

    setVideoSettings('loop');
    expect(useSettingsStore.getState().videos.loop).toBe(!videos.loop);
  });

  it('Change post sort', () => {
    const { setPostSort } = useSettingsStore.getState();

    setPostSort('new');
    expect(useSettingsStore.getState().posts.sort).toBe('new');
  });

  it('Change post settings', () => {
    const settings = useSettingsStore.getState().posts;
    const { setPostSettings } = useSettingsStore.getState();

    setPostSettings('author');
    expect(useSettingsStore.getState().posts.author).toBe(!settings.author);

    setPostSettings('flairs');
    expect(useSettingsStore.getState().posts.flairs).toBe(!settings.flairs);

    setPostSettings('hideRead');
    expect(useSettingsStore.getState().posts.hideRead).toBe(!settings.hideRead);
  });

  it('Change comment sort', () => {
    const { setCommentSort } = useSettingsStore.getState();

    setCommentSort('new');
    expect(useSettingsStore.getState().comments.sort).toBe('new');
  });

  it('Change comment settings', () => {
    const settings = useSettingsStore.getState().comments;
    const { setCommentSettings } = useSettingsStore.getState();

    setCommentSettings('avatar');
    expect(useSettingsStore.getState().comments.avatar).toBe(!settings.avatar);

    setCommentSettings('awards');
    expect(useSettingsStore.getState().comments.awards).toBe(!settings.awards);

    setCommentSettings('flairs');
    expect(useSettingsStore.getState().comments.flairs).toBe(!settings.flairs);
  });

  it('Change card settings', () => {
    const settings = useSettingsStore.getState().card;
    const { setCardSettings } = useSettingsStore.getState();

    setCardSettings('carousel');
    expect(useSettingsStore.getState().card.carousel).toBe(!settings.carousel);

    setCardSettings('previewText');
    expect(useSettingsStore.getState().card.previewText).toBe(
      !settings.previewText
    );
  });
});
