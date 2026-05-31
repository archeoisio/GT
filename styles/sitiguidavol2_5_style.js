var size = 0;
var placement = 'point';

var style_sitiguidavol2_5 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var labelFont = "bold 13.0px \'Open Sans\', sans-serif"; // Aggiunto bold per rendere il numero bianco più leggibile
    var labelFill = "#ffffff"; // Modificato in BIANCO per il testo del cluster
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "center";
    var offsetX = 0; // Centrato per il testo del cluster
    var offsetY = 0;
    var value;
    var clusteredFeatures = feature.get("features");
    size = clusteredFeatures.length;
    
    // Configurazione colore Blu uniforme per punti e cluster
    var clusterColor = 'rgba(0, 102, 204, 0.8)';
    var clusterOuterColor = 'rgba(0, 102, 204, 0.3)';
    
    if (size == 1) { // Se il cluster ha UN SOLO punto
        var singleFeature = clusteredFeatures[0];
        value = singleFeature.get("''");
        
        labelText = ""; 
        
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: clusterColor // Blu
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff', // Bordo bianco
                        width: 2
                    })
                })
            })
        ];
        
    } else { // Se il cluster ha PIÙ DI UN punto
        labelText = size.toString();
        var radius = 8 + Math.log(size) * 3; // Leggermente ingrandito il raggio base per contenere meglio il testo
        
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius + 4,
                    fill: new ol.style.Fill({
                        color: clusterOuterColor // Alone esterno blu trasparente
                    })
                })
            }),
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: clusterColor // Cerchio interno blu
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff', // Bordo bianco anche per il cluster
                        width: 2
                    })
                }),
                text: new ol.style.Text({
                    font: labelFont,
                    text: labelText,
                    fill: new ol.style.Fill({
                        color: labelFill // Testo bianco
                    }),
                    placement: placement
                })
            })
        ];
    }
};
