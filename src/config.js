// setup class constructor and prototype object to persist user-configurable
// constants throughout app
function Dialogue() {}
Dialogue.prototype.config = {
  customParamMessages: {}
}
// export config reference for destructured imports
export const config = Dialogue.prototype.config