var size = 0;
var placement = 'point';

var style_sititecnicopratica = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    
    var labelText = ""; 
    var value = feature.get("");
    var labelFont = "13.0px \'Open Sans\', sans-serif";
    var labelFill = "#323232";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 0;
    var offsetY = 0;
    var placement = 'point';
    
    // Etichette rimosse per mantenere la mappa pulita
    
    var style = [ new ol.style.Style({
        // Cambiata la stella con un cerchio per differenziare i Siti dai Musei
        image: new ol.style.Circle({
            radius: 6.0 + size,
            displacement: [0, 0],
            stroke: new ol.style.Stroke({
                color: 'rgba(0, 0, 0, 1.0)', 
                lineDash: null, 
                lineCap: 'butt', 
                lineJoin: 'miter', 
                width: 1.0
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255, 0, 0, 1.0)' // Colore Rosso
            })
        }),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};
