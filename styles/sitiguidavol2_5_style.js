var style_sitiguidavol2_5 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var labelFont = "bold 13.0px 'Open Sans', sans-serif"; 
    var labelFill = "#ffffff"; 
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "center";
    var offsetX = 0; 
    var offsetY = 0;
    var value;
    
    // --- PROTEZIONE ANTICRASH ---
    var clusteredFeatures = feature.get("features");
    if (!clusteredFeatures) {
        clusteredFeatures = [];
    }
    size = clusteredFeatures.length;
    
    // Se il cluster è vuoto, non disegnare alcuno stile (invisibile)
    if (size === 0) {
        return [];
    }
    // ----------------------------
    
    var clusterColor = 'rgba(0, 102, 204, 0.8)';
    var clusterOuterColor = 'rgba(0, 102, 204, 0.3)';
    
    if (size == 1) { 
        var singleFeature = clusteredFeatures[0];
        value = singleFeature ? singleFeature.get("''") : "";
        
        labelText = ""; 
        
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: 6,
                    fill: new ol.style.Fill({
                        color: clusterColor 
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff', 
                        width: 2
                    })
                })
            })
        ];
        
    } else { 
        labelText = size.toString();
        var radius = 8 + Math.log(size) * 3; 
        
        return [
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius + 4,
                    fill: new ol.style.Fill({
                        color: clusterOuterColor 
                    })
                })
            }),
            new ol.style.Style({
                image: new ol.style.Circle({
                    radius: radius,
                    fill: new ol.style.Fill({
                        color: clusterColor 
                    }),
                    stroke: new ol.style.Stroke({
                        color: '#ffffff', 
                        width: 2
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
