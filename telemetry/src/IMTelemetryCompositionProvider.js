/*global define*/

define(
    [
        '../../../src/api/composition/DefaultCompositionProvider',
        '../../../src/api/objects/object-utils'
    ],
    function (
        DefaultCompositionProvider,
        objectUtils
    ) {
        var TAXONOMY_SPACE = "im",
            TAXONOMY_KEY = "sc",
            SUBSYSTEM_SPACE = "im_tlm";

        function IMTelemetryCompositionProvider(openmct) {
            this.openmct = openmct;
            DefaultCompositionProvider.call(this, openmct);
        }

        IMTelemetryCompositionProvider.prototype = Object.create(DefaultCompositionProvider.prototype);

       IMTelemetryCompositionProvider.prototype.appliesTo = function (domainObject) {
            return domainObject.identifier &&
                domainObject.identifier.namespace === TAXONOMY_SPACE &&
                domainObject.identifier.key === TAXONOMY_KEY;
        };

        IMTelemetryCompositionProvider.prototype.load = function (domainObject) {
            var adapter = this.openmct.$injector.get('im.adapter');
            function makeId(subsystem) {
                return objectUtils.parseKeyString(SUBSYSTEM_SPACE + ":" + subsystem.identifier);
            }
            return adapter.dictionary().then(function (dictionary) {
                return dictionary.subsystems.map(makeId);
            });
        };

        return IMTelemetryCompositionProvider;
    }
);