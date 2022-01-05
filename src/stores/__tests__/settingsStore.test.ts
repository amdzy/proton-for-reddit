import { useSettingsStore } from "..";

describe("Settings store", () => {
  it("Change notification settings", () => {
    const notification = useSettingsStore.getState().notifications.enabled;
    const setNotifications = useSettingsStore.getState().setNotifications;

    setNotifications();
    expect(useSettingsStore.getState().notifications.enabled).toBe(
      !notification
    );
  });

  it("Change notification interval", () => {
    const setInterval = useSettingsStore.getState().setNotificationsInterval;

    setInterval("1 Min", 1000);

    expect(useSettingsStore.getState().notifications.interval).toEqual({
      value: 1000,
      text: "1 Min",
    });
  });

  it("Change data-saver settings", () => {
    const dataSaver = useSettingsStore.getState().dataSaver;
    const setDataSaver = useSettingsStore.getState().setDataSaver;

    setDataSaver();
    expect(useSettingsStore.getState().dataSaver).toBe(!dataSaver);
  });

  it("Change video settings", () => {
    const videos = useSettingsStore.getState().videos;
    const setVideoSettings = useSettingsStore.getState().setVideoSettings;

    setVideoSettings("mute");
    expect(useSettingsStore.getState().videos.mute).toBe(!videos.mute);

    setVideoSettings("loop");
    expect(useSettingsStore.getState().videos.loop).toBe(!videos.loop);
  });

  it("Change post sort", () => {
    const setPostSort = useSettingsStore.getState().setPostSort;

    setPostSort("new");
    expect(useSettingsStore.getState().posts.sort).toBe("new");
  });

  it("Change post settings", () => {
    const settings = useSettingsStore.getState().posts;
    const setPostSettings = useSettingsStore.getState().setPostSettings;

    setPostSettings("author");
    expect(useSettingsStore.getState().posts.author).toBe(!settings.author);

    setPostSettings("flairs");
    expect(useSettingsStore.getState().posts.flairs).toBe(!settings.flairs);

    setPostSettings("hideRead");
    expect(useSettingsStore.getState().posts.hideRead).toBe(!settings.hideRead);

    setPostSettings("share");
    expect(useSettingsStore.getState().posts.buttons.share).toBe(
      !settings.buttons.share
    );
  });

  it("Change comment sort", () => {
    const setCommentSort = useSettingsStore.getState().setCommentSort;

    setCommentSort("new");
    expect(useSettingsStore.getState().comments.sort).toBe("new");
  });

  it("Change comment settings", () => {
    const settings = useSettingsStore.getState().comments;
    const setCommentSettings = useSettingsStore.getState().setCommentSettings;

    setCommentSettings("avatar");
    expect(useSettingsStore.getState().comments.avatar).toBe(!settings.avatar);

    setCommentSettings("awards");
    expect(useSettingsStore.getState().comments.awards).toBe(!settings.awards);

    setCommentSettings("flairs");
    expect(useSettingsStore.getState().comments.flairs).toBe(!settings.flairs);
  });

  it("Change card settings", () => {
    const settings = useSettingsStore.getState().card;
    const setCardSettings = useSettingsStore.getState().setCardSettings;

    setCardSettings("carousel");
    expect(useSettingsStore.getState().card.carousel).toBe(!settings.carousel);

    setCardSettings("subIcon");
    expect(useSettingsStore.getState().card.subIcon).toBe(!settings.subIcon);

    setCardSettings("previewText");
    expect(useSettingsStore.getState().card.previewText).toBe(
      !settings.previewText
    );
  });
});
