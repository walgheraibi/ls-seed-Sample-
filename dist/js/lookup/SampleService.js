/**
 * Created by weaamalgheraibi on 4/20/15.
 */

define(['./module'], function(module) {
    'use strict';
    module.service('sampleService', ['$q', SampleService]);

    function SampleService($q){
        var samples = [
            {
                Gender: "Female",
                Age: "83",
                Ethnicity: "caucasian",
                Uni: "Bilateral",
                Disease: "advanced Neovascular AMD, artery occlusion",
                Code: "AMD #1",
                Comment: ""
            },
            {
                Gender: "Male",
                Age: "82",
                Ethnicity: "caucasian",
                Uni: "Bilateral",
                Disease: "advanced Neovascular AMD, OU",
                Code: "AMD #2",
                Comment: ""
            },
            {
                Gender: "Male",
                Age: "55",
                Ethnicity: "caucasian",
                Uni: "Bilateral",
                Disease: "intermediate and large drusen and pigment change",
                Code: "AMD #3",
                Comment: ""
            }
        ];
        return {
            loadAllSamples : function() {
                return $q.when(samples);
            }
        };
    }

});
