import sendEventToMain from "./sendEvent";

/**
 * Triggers a home card action by sending an event to the main process.
 * @param {number[]} actionIdx - The index of the action to be triggered. Link groups can have nested actions, hence the array.
 */
const triggerHomeCardAction = (actionIdx: number[]) => {
  sendEventToMain("runHomeCardAction", {
    actionIdx,
  });
};

export default triggerHomeCardAction;
