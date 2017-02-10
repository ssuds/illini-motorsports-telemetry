define([
    'openmct',
    './src/IMTelemetryServerAdapter',
    './src/IMTelemetryCompositionProvider',
    './src/IMTelemetryModelProvider'
], function (
    openmct,
    IMTelemetryServerAdapter,
    IMTelemetryCompositionProvider,
    IMTelemetryModelProvider
) {
    openmct.legacyRegistry.register("illini-motorsports-telemetry/telemetry", {
        "name": "Illini Motorsports Telemetry Adapter",
        "extensions": {
            "types": [
                {
                    "name": "Spacecraft",
                    "key": "im.spacecraft",
                    "cssclass": "icon-object"
                },
                {
                    "name": "Subsystem",
                    "key": "im.subsystem",
                    "cssclass": "icon-object",
                    "model": { "composition": [] }
                },
                {
                    "name": "Measurement",
                    "key": "im.measurement",
                    "cssclass": "icon-telemetry",
                    "model": { "telemetry": {} },
                    "telemetry": {
                        "source": "im.source",
                        "domains": [
                            {
                                "name": "Time",
                                "key": "timestamp"
                            }
                        ]
                    }
                }
            ],
            "roots": [
                {
                    "id": "im:sc",
                    "priority": "preferred"
                }
            ],
            "models": [
                {
                    "id": "im:sc",
                    "model": {
                        "type": "im.spacecraft",
                        "name": "My Spacecraft",
                        "location": "ROOT",
                        "composition": []
                    }
                }
            ],
            "services": [
                {
                    "key": "im.adapter",
                    "implementation": IMTelemetryServerAdapter,
                    "depends": [ "$q", "IM_WS_URL" ]
                }
            ],
            "constants": [
                {
                    "key": "IM_WS_URL",
                    "priority": "fallback",
                    "value": "ws://localhost:8081"
                }
            ],
            "components": [
                {
                    "provides": "modelService",
                    "type": "provider",
                    "implementation": IMTelemetryModelProvider,
                    "depends": [ "im.adapter", "$q" ]
                },
                {
                    "provides": "telemetryService",
                    "type": "provider",
                    "implementation": "IMTelemetryProvider.js",
                    "depends": [ "im.adapter", "$q" ]
                }
            ]
        }
    });
    openmct.composition.addProvider(new IMTelemetryCompositionProvider(openmct));
});
