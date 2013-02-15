(function () {
    "use strict";

    WinJS.Namespace.define("RedBit", {
        // settings helper class
        Settings: WinJS.Class.define(
                function Settings() {
                    RedBit.Settings.instance = this;
                    this.getValue.bind(this);
                    this.setValue.bind(this);
                },

                // instance
                {
                    // the current metric system used
                    unitOfMeasure: {
                        get: function () {
                            return this.getValue('unitOfMeasure', RedBit.Settings.UnitOfMeasureType.imperial);
                        },
                        set: function (value) {
                            this.setValue('unitOfMeasure', value, RedBit.Settings.unitOfMeasureChangedEvent);
                        }
                    },

                    // gets the value from the container app settings
                    getValue: function (key, defaultValue) {
                        var container = this.ensureSettingsContainer();
                        var ret = container.values[key];
                        if (typeof (ret) === 'undefined')
                            ret = defaultValue;
                        return ret;
                    },

                    // sets the value from the container app settings
                    setValue: function (key, value, eventToDispatch) {
                        var container = this.ensureSettingsContainer();
                        container.values[key] = value;
                        if (eventToDispatch)
                            this.dispatchEvent(eventToDispatch, value);
                    },

                    // ensures the settings container is created
                    ensureSettingsContainer: function () {
                        var localSettings = Windows.Storage.ApplicationData.current.localSettings;
                        var ret = undefined;
                        if (!localSettings.containers.hasKey('RedBitSettingsContainer'))
                            ret = localSettings.createContainer('RedBitSettingsContainer', Windows.Storage.ApplicationDataCreateDisposition.always);
                        else
                            ret = localSettings.containers.lookup('RedBitSettingsContainer');

                        return ret;
                    }
                },

                // statics
                {
                    // static instance used everywhere
                    instance: undefined,

                    // metric types
                    UnitOfMeasureType: {
                        imperial: 0,
                        metric: 1,
                    },

                    // events
                    unitOfMeasureChangedEvent: 'unitOfMeasureChanged',
                })
    })

    // wire up the classes
    WinJS.Class.mix(RedBit.Settings, WinJS.Utilities.eventMixin);
    WinJS.Class.mix(RedBit.Settings, WinJS.Utilities.createEventProperties(
        RedBit.Settings.unitOfMeasureChangedEvent));
})();