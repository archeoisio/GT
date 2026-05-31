var size = 0;
var placement = 'point';

var style_sitiguidavol2_5 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var labelFont = "13.0px \'Open Sans\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "center";
    var offsetX = 15;
    var offsetY = 10;
    var value;
    var clusteredFeatures = feature.get("features");
    size = clusteredFeatures.length;
    
    if (size == 1) { // Se il cluster ha UN SOLO punto
        var singleFeature = clusteredFeatures[0];
        value = singleFeature.get("''");
        
        // Svuotiamo il testo per non mostrare etichette fastidiose sul punto singolo
        labelText = ""; 
        
        // Creiamo lo stile visivo per il punto singolo (altrimenti non vedi nulla allo zoom)
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: 'rgba(0, 102, 204, 0.8)' // Colore del punto singolo (Blu)
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff',
                        width: 2
                    })
                })
            })
        ];
        
    } else { // Se il cluster ha PIÙ DI UN punto (mostra il cerchio del cluster col numero)
        labelText = size.toString();
        var radius = 6 + Math.log(size) * 3;
        var maxClusterSize = 80;
        var relativeSize = Math.min(size / maxClusterSize, 1);
        var redComponent = 0;
        var greenComponent = 0;
        var blueComponent = 0;
        
        if (relativeSize < 0.5) {
            redComponent = Math.floor(210 * (relativeSize / 0.5));
            greenComponent = 210;
        } else {
            redComponent = 210;
            greenComponent = Math.floor(210 * (1 - (relativeSize - 0.5) / 0.5));
        }
        var color = `rgba(${redComponent}, ${greenComponent}, ${blueComponent}, 0.75)`;
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius + 4,
                    fill: new ol.style.Fill({
                        color: `rgba(${redComponent}, ${greenComponent}, ${blueComponent}, 0.3)`
                    })
                })
            }),
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: color
                    })
                }),
                text: new ol.style.Text({
                    font: labelFont,
                    text: labelText,
                    fill: new ol.style.Fill({
                        color: labelFill
                    }),
                    placement: placement
                })
            })
        ];
    }
};
