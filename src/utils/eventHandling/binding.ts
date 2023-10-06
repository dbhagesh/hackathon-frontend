/* eslint-disable @typescript-eslint/no-explicit-any */
type eventsObjT = {
  sel: string;
  name: string;
  func: (b: Event) => void;
};

type eventBindingT = {
  on: (obj: eventsObjT) => null | (() => void);
  init: () => void;
};

const eventBindingSingleton = (function () {
  const eventBinding = (): eventBindingT => {
    const _clickEventsObj: eventsObjT[] = [];
    const _focusEventsObj: eventsObjT[] = [];
    const _blurEventsObj: eventsObjT[] = [];

    const registerEvent = (obj: eventsObjT) => {
      if (obj.sel && obj.name) {
        let _eventObj!: eventsObjT[];
        if (obj.name === "click") {
          _eventObj = _clickEventsObj;
        } else if (obj.name === "focus") {
          _eventObj = _focusEventsObj;
        } else if (obj.name === "blur") {
          _eventObj = _blurEventsObj;
        }
        if (_eventObj) {
          _eventObj.push(obj);
          return function unregisterEvent() {
            const index = _eventObj.indexOf(obj);
            _eventObj.splice(index, 1);
          };
        }
      }
      return null;
    };
    const executeCallbacks = (eventObj: eventsObjT[], e: Event) => {
      // const target = e.target as HTMLElement;
      eventObj.forEach((obj) => {
        obj.func.call(null, e);
      });
    };
    const init = () => {
      document.addEventListener("click", function (e: Event) {
        e = e || window.event;
        executeCallbacks(_clickEventsObj, e);
      });
      window.addEventListener("focus", function (e: Event) {
        e = e || window.event;
        executeCallbacks(_focusEventsObj, e);
      });
      window.addEventListener("blur", function (e: Event) {
        e = e || window.event;
        executeCallbacks(_blurEventsObj, e);
      });
    };

    return {
      on: registerEvent,
      init: init,
    };
  };

  let instance!: eventBindingT;
  if (!instance) {
    instance = eventBinding();
    instance.init();
  }
  return instance;
})();

export default eventBindingSingleton;
