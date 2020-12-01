let eventGuid = 0;

export function createEventId() {
  return String(eventGuid++);
}
