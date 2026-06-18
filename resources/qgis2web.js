// =========================================================================
// 1. CONFIGURAZIONE DELLA VISTA E ZOOM (PULITA - SENZA ALCUN FIT)
// =========================================================================
// Il centro geometrico dove si posizionerà la mappa all'avvio
var centroMappa = ol.proj.fromLonLat([12.5000, 43]); 

// Rettangolo di movimento (Europa/Mediterraneo) per dare spazio allo zoom
var confiniGradiAmpio = [-3.70, 34, 27.00, 49];
var confiniBloccatiMappa = ol.extent.applyTransform(confiniGradiAmpio, ol.proj.getTransform('EPSG:4326', 'EPSG:3857'));

// 🌍 MODIFICA QUESTI DUE VALORI PER REGOLARE LO ZOOM COME VUOI
var zoomDesktopScelto = 5.9;  // Abbassa a 4.0 o 3.0 se vuoi vedere più territorio intorno
var zoomMobileScelto  = 2.9;  

var isSmallScreen = window.innerWidth < 650;
var zoomFinale = isSmallScreen ? zoomMobileScelto : zoomDesktopScelto;

var doHover = false;     
var doHighlight = false;  

var vistaIniziale = new ol.View({
    center: centroMappa,
    zoom: zoomFinale,
    minZoom: 1.5, // Ti permette di fare tutto lo zoom indietro che vuoi                 
    maxZoom: 28, 
    extent: confiniBloccatiMappa,  
    enableRotation: false
});

// =========================================================================
// 2. INIZIALIZZAZIONE MAPPA PULITA
// =========================================================================
var map = new ol.Map({
    target: 'map',
    renderer: 'canvas',
    layers: layersList,
    view: vistaIniziale
});

// Controllo dei confini: impedisce solo di trascinare la mappa nel vuoto grigio
map.getView().on('change:center', function() {
    var view = map.getView();
    var center = view.getCenter();
    if (!ol.extent.containsCoordinate(confiniBloccatiMappa, center)) {
        view.setCenter(centroMappa); 
    }
});
// =========================================================================
// 3. GESTIONE CURSORE
// =========================================================================
function pointerOnFeature(evt) {
    if (evt.dragging) return;
    var hasFeature = map.hasFeatureAtPixel(evt.pixel, {
        layerFilter: function(layer) {
            return layer && layer.get("interactive");
        }
    });
    map.getViewport().style.cursor = hasFeature ? "pointer" : "";
}
map.on('pointermove', pointerOnFeature);

function styleCursorMove() {
    map.on('pointerdrag', function() {
        map.getViewport().style.cursor = "move";
    });
    map.on('pointerup', function() {
        map.getViewport().style.cursor = "default";
    });
}
styleCursorMove();

var hasTouchScreen = map.getViewport().classList.contains('ol-touch');

// =========================================================================
// 4. CONTENITORI UI PER CONTROLLI
// =========================================================================
var topLeftContainer = new ol.control.Control({
    element: (() => {
        var div = document.createElement('div');
        div.id = 'top-left-container';
        return div;
    })()
});
var bottomLeftContainer = new ol.control.Control({
    element: (() => {
        var div = document.createElement('div');
        div.id = 'bottom-left-container';
        return div;
    })()
});
var topRightContainer = new ol.control.Control({
    element: (() => {
        var div = document.createElement('div');
        div.id = 'top-right-container';
        return div;
    })()
});
var bottomRightContainer = new ol.control.Control({
    element: (() => {
        var div = document.createElement('div');
        div.id = 'bottom-right-container';
        return div;
    })()
});

map.addControl(topLeftContainer);
map.addControl(bottomLeftContainer);
map.addControl(topRightContainer);
map.addControl(bottomRightContainer);

var topLeftContainerDiv = document.getElementById('top-left-container');
var bottomLeftContainerDiv = document.getElementById('bottom-left-container');
var topRightContainerDiv = document.getElementById('top-right-container');
var bottomRightContainerDiv = document.getElementById('bottom-right-container');

// =========================================================================
// 5. CONFIGURAZIONE POPUP E LOGICA CAMPI (POSIZIONAMENTO AUTOMATICO ANTI-TAGLIO)
// =========================================================================
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');
var sketch;

function stopMediaInPopup() {
    var mediaElements = container.querySelectorAll('audio, video');
    mediaElements.forEach(function(media) {
        media.pause();
        media.currentTime = 0;
    });
}

closer.onclick = function() {
    container.style.display = 'none';
    closer.blur();
    stopMediaInPopup();
    return false;
};

var overlayPopup = new ol.Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250 
    },
    autoPanMargin: 30,         
    positioning: 'top-center', 
    offset: [0, 15]            
});
map.addOverlay(overlayPopup);

var NO_POPUP = 0;
var ALL_FIELDS = 1;
var autolinker = new Autolinker({truncate: {length: 30, location: 'smart'}});

function getPopupFields(layerList, layer) {
    var idx = layersList.indexOf(layer) - (layersList.length - popupLayers.length);
    return popupLayers[idx];
}

function createPopupField(currentFeature, currentFeatureKeys, layer) {
    var popupText = '';
    for (var i = 0; i < currentFeatureKeys.length; i++) {
        var key = currentFeatureKeys[i];
        if (key != 'geometry' && key != 'layerObject' && key != 'idO') {
            var popupField = '';
            var labelType = layer.get('fieldLabels')[key];
            
            if (labelType == "hidden field") continue;
            if (labelType == "inline label - visible with data" && currentFeature.get(key) == null) continue;
            if (labelType == "header label - visible with data" && currentFeature.get(key) == null) continue;

            if (labelType == "inline label - always visible" || labelType == "inline label - visible with data") {
                popupField += '<th>' + layer.get('fieldAliases')[key] + '</th><td>';
            } else {
                popupField += '<td colspan="2">';
            }

            if (labelType == "header label - always visible" || labelType == "header label - visible with data") {
                popupField += '<strong>' + layer.get('fieldAliases')[key] + '</strong><br />';
            }

            var fieldValue = currentFeature.get(key);
            if (layer.get('fieldImages')[key] != "ExternalResource") {
                popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
            } else {
                if (/\.(gif|jpg|jpeg|tif|tiff|png|avif|webp|svg)$/i.test(fieldValue)) {
                    popupField += (fieldValue != null ? '<img src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" /></td>' : '');
                } else if (/\.(mp4|webm|ogg|avi|mov|flv)$/i.test(fieldValue)) {
                    popupField += (fieldValue != null ? '<video controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="video/mp4">Il tuo browser non supporta il tag video.</video></td>' : '');
                } else if (/\.(mp3|wav|ogg|aac|flac)$/i.test(fieldValue)) {
                    popupField += (fieldValue != null ? '<audio controls><source src="images/' + fieldValue.replace(/[\\\/:]/g, '_').trim() + '" type="audio/mpeg">Il tuo browser non supporta il tag audio.</audio></td>' : '');
                } else {
                    popupField += (fieldValue != null ? autolinker.link(fieldValue.toLocaleString()) + '</td>' : '');
                }
            }
            popupText += '<tr>' + popupField + '</tr>';
        }
    }
    return popupText;
}

// =========================================================================
// 6. HIGHLIGHT (POINTERMOVE)
// =========================================================================
var collection = new ol.Collection();
var featureOverlay = new ol.layer.Vector({
    map: map,
    source: new ol.source.Vector({ features: collection, useSpatialIndex: false }),
    style: [new ol.style.Style({
        stroke: new ol.style.Stroke({ color: '#f00', width: 1 }),
        fill: new ol.style.Fill({ color: 'rgba(255,0,0,0.1)' })
    })],
    updateWhileAnimating: true,
    updateWhileInteracting: true
});

var highlight;

function onPointerMove(evt) {
    if (!doHighlight) return; 
    
    var pixel = map.getEventPixel(evt.originalEvent);
    var currentFeature, currentLayer, clusteredFeatures, clusterLength;

    var featuresAndLayers = [];
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            featuresAndLayers.push({ feature: feature, layer: layer });
        }
    });

    if (featuresAndLayers.length > 0) {
        var lastIndex = featuresAndLayers.length - 1;
        currentFeature = featuresAndLayers[lastIndex].feature;
        currentLayer = featuresAndLayers[lastIndex].layer;
        clusteredFeatures = currentFeature.get("features");
        if (clusteredFeatures) clusterLength = clusteredFeatures.length;
    }
    
    if (doHighlight) {
        if (currentFeature !== highlight) {
            if (highlight) featureOverlay.getSource().removeFeature(highlight);
            if (currentFeature) {
                var featureStyle;
                if (typeof clusteredFeatures == "undefined") {
                    var style = currentLayer.getStyle();
                    var styleFunction = typeof style === 'function' ? style : function() { return style; };
                    featureStyle = styleFunction(currentFeature)[0];
                } else {
                    featureStyle = currentLayer.getStyle().toString();
                }

                var geomType = currentFeature.getGeometry().getType();
                var highlightStyle;
                if (geomType == 'Point' || geomType == 'MultiPoint') {
                    var radius = (typeof clusteredFeatures == "undefined") ? featureStyle.getImage().getRadius() : parseFloat(featureStyle.split('radius')[1].split(' ')[1]) + clusterLength;
                    highlightStyle = new ol.style.Style({
                        image: new ol.style.Circle({
                            fill: new ol.style.Fill({ color: "rgba(255, 255, 0, 1.00)" }),
                            radius: radius
                        })
                    });
                } else if (geomType == 'LineString' || geomType == 'MultiLineString') {
                    highlightStyle = new ol.style.Style({
                        stroke: new ol.style.Stroke({ color: 'rgba(255, 255, 0, 1.00)', lineDash: null, width: featureStyle.getStroke().getWidth() })
                    });
                } else {
                    highlightStyle = new ol.style.Style({
                        fill: new ol.style.Fill({ color: 'rgba(255, 255, 0, 1.00)' })
                    });
                }
                featureOverlay.getSource().addFeature(currentFeature);
                featureOverlay.setStyle(highlightStyle);
            }
            highlight = currentFeature;
        }
    }
}
map.on('pointermove', onPointerMove);

// =========================================================================
// 7. GESTIONE EVENTI CLICK (APERTURA POPUP UNICA)
// =========================================================================
var popupContent = '';
var popupCoord = null;
var featuresPopupActive = false;

function updatePopup() {
    if (popupContent) {
        content.innerHTML = popupContent;
        container.style.display = 'block';
        overlayPopup.setPosition(popupCoord);
    } else {
        container.style.display = 'none';
        closer.blur();
        stopMediaInPopup();
    }
} 

function onSingleClickFeatures(evt) {
    if (sketch) return;
    featuresPopupActive = true;

    var pixel = map.getEventPixel(evt.originalEvent);
    var coord = evt.coordinate;
    var currentFeature, currentFeatureKeys, clusteredFeatures;
    var popupText = '<ul>';
    
    map.forEachFeatureAtPixel(pixel, function(feature, layer) {
        if (layer && feature instanceof ol.Feature && (layer.get("interactive") || layer.get("interactive") === undefined)) {
            
            var nomeLayer = layer.get('title') || '';
            if (nomeLayer.toLowerCase().includes('regioni') || 
                nomeLayer.toLowerCase().includes('provincie') || 
                nomeLayer.toLowerCase().includes('unitaterritorialisovracomunali')) {
                return; 
            }

            var doPopup = false;
            for (var k in layer.get('fieldImages')) {
                if (layer.get('fieldImages')[k] !== "Hidden") doPopup = true;
            }
            currentFeature = feature;
            clusteredFeatures = feature.get("features");
            if (typeof clusteredFeatures !== "undefined") {
                if (doPopup) {
                    for(var n = 0; n < clusteredFeatures.length; n++) {
                        currentFeature = clusteredFeatures[n];
                        currentFeatureKeys = currentFeature.getKeys();
                        popupText += '<li><table><a><b>' + layer.get('popuplayertitle') + '</b></a>';
                        popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                        popupText += '</table></li>';    
                    }
                }
            } else {
                currentFeatureKeys = currentFeature.getKeys();
                if (doPopup) {
                    popupText += '<li><table><a><b>' + layer.get('popuplayertitle') + '</b></a>';
                    popupText += createPopupField(currentFeature, currentFeatureKeys, layer);
                    popupText += '</table>';
                }
            }
        }
    });
    
    popupContent = (popupText === '<ul>') ? '' : popupText + '</ul>';
    popupCoord = coord;
    updatePopup();
}

function onSingleClickWMS(evt) {
    if (sketch) return;
    if (!featuresPopupActive) popupContent = '';

    var coord = evt.coordinate;
    var viewProjection = map.getView().getProjection();
    var viewResolution = map.getView().getResolution();

    for (var i = 0; i < wms_layers.length; i++) {
        if (wms_layers[i][1] && wms_layers[i][0].getVisible()) {
            var url = wms_layers[i][0].getSource().getFeatureInfoUrl(evt.coordinate, viewResolution, viewProjection, { 'INFO_FORMAT': 'text/html' });
            if (url) {
                const wmsTitle = wms_layers[i][0].get('popuplayertitle');
                var ldsRoller = '<div class="roller-switcher" style="height: 25px; width: 25px;"></div>';

                popupCoord = coord;
                popupContent += ldsRoller;
                updatePopup();

                var timeoutPromise = new Promise((resolve, reject) => {
                    setTimeout(() => reject(new Error('Timeout exceeded')), 5000);
                });

                function tryFetch(urls) {
                    if (urls.length === 0) return Promise.reject(new Error('All fetch attempts failed'));
                    return fetch(urls[0])
                        .then((response) => response.ok ? response.text() : Promise.reject())
                        .catch(() => tryFetch(urls.slice(1)));
                }

                const urlsToTry = [url, encodeURIComponent(url), 'https://api.allorigins.win/raw?url=' + encodeURIComponent(url)];

                Promise.race([tryFetch(urlsToTry), timeoutPromise])
                    .then((html) => {
                        if (html.indexOf('<table') !== -1) {
                            popupContent += '<a><b>' + wmsTitle + '</b></a>' + html + '<p></p>';
                            updatePopup();
                        }
                    })
                    .finally(() => {
                        setTimeout(() => {
                            var loaderIcon = document.querySelector('.roller-switcher');
                            if (loaderIcon) loaderIcon.remove();
                        }, 500);
                    });
            }
        }
    }
}

map.on('singleclick', onSingleClickFeatures);
map.on('singleclick', onSingleClickWMS);

// =========================================================================
// 8. GEOCODER COMPONENT (PHOTON & NOMINATIM)
// =========================================================================
var geocoderLayer = new ol.layer.Vector({ source: new ol.source.Vector() });
map.addLayer(geocoderLayer);
var vectorSource = geocoderLayer.getSource();

var obj2 = { value: '', get gcd() { return this.value; }, set gcd(value) { this.value = value; } };
var obj = { value: '', get label() { return this.value; }, set label(value) { this.value = value; } };

function onSelected(feature) {
    obj.label = feature;
    input.value = typeof obj.label.properties.label === "undefined" ? obj.label.properties.display_name : obj.label.properties.label;
    var coordinates = ol.proj.transform([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], "EPSG:4326", map.getView().getProjection());
    vectorSource.clear(true);
    obj2.gcd = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]];
    var marker = new ol.Feature(new ol.geom.Point(coordinates));
    marker.setStyle(new ol.style.Style({
        image: new ol.style.Icon({ anchor: [0.5, 1], anchorXUnits: 'fraction', anchorYUnits: 'fraction', scale: 0.7, opacity: 1, src: "./resources/marker.png", zIndex: 1 }),
        zIndex: 1
    }));
    vectorSource.addFeature(marker);
    map.getView().setCenter(coordinates);
    map.getView().setZoom(18);
}

var formatResult = function (feature, el) {
    var title = document.createElement("strong");
    el.appendChild(title);
    var detailsContainer = document.createElement("small");
    el.appendChild(detailsContainer);
    var details = [];
    title.innerHTML = feature.properties.label || feature.properties.display_name;
    if (feature.properties.city && feature.properties.city !== feature.properties.name) details.push(feature.properties.city);
    if (feature.properties.context) details.push(feature.properties.context);
    detailsContainer.innerHTML = details.join(", ");
};

class AddDomControl extends ol.control.Control {
    constructor(elementToAdd, opt_options) {
        const options = opt_options || {};
        const element = document.createElement("div");
        if (options.className) element.className = options.className;
        element.appendChild(elementToAdd);
        super({ element: element, target: options.target });
    }
}

const urlGeocoder = { "Nominatim OSM": "https://nominatim.openstreetmap.org/search?format=geojson&addressdetails=1&" };
var containers = new Photon.Search({
    resultsHandler: function() {},
    onSelected: onSelected,
    placeholder: "Search an address",
    formatResult: formatResult,
    url: urlGeocoder["Nominatim OSM"],
    position: "topright"
});

var controlGeocoder = new AddDomControl(containers, { className: "photon-geocoder-autocomplete ol-unselectable ol-control" });
map.addControl(controlGeocoder);
var search = document.getElementsByClassName("photon-geocoder-autocomplete ol-unselectable ol-control")[0];
search.style.display = "flex";

var button = document.createElement("button");
button.type = "button";
button.id = "gcd-button-control";
button.className = "gcd-gl-btn fa fa-search leaflet-control";
search.insertBefore(button, search.firstChild);

var last = search.lastChild;
last.style.display = "none";
button.addEventListener("click", function () {
    last.style.display = (last.style.display === "none") ? "block" : "none";
});
var input = document.getElementsByClassName("photon-input")[0];

// =========================================================================
// 9. LAYER SWITCHER & ATTRIBUZIONI
// =========================================================================
var layerSwitcher = new ol.control.LayerSwitcher({ tipLabel: "Layers" });
map.addControl(layerSwitcher);

var bottomAttribution = new ol.control.Attribution({ collapsible: false, collapsed: false, className: 'bottom-attribution' });
map.addControl(bottomAttribution);

map.once('rendercomplete', function() {
    var bottomAttributionUl = bottomAttribution.element.querySelector('ul');
    if (bottomAttributionUl) {
        var layerAttrs = Array.from(bottomAttributionUl.querySelectorAll('li')).map(li => li.innerHTML.trim()).filter(Boolean);
        var attribHtml = `<a href="https://github.com/qgis2web/qgis2web">qgis2web</a> &middot; <a href="https://openlayers.org/">OpenLayers</a> &middot; <a href="https://qgis.org/">QGIS</a>`;
        if (layerAttrs.length > 0) attribHtml += ' &nbsp;|&nbsp; ' + layerAttrs.join(', ');
        bottomAttributionUl.innerHTML = '<li>' + attribHtml + '</li>';
    }
});

// =========================================================================
// 10. SMISTAMENTO DEI CONTROLLI NEI RISPETTIVI CONTAINER ORDINATI
// =========================================================================
var zoomControl = document.getElementsByClassName('ol-zoom')[0];
if (zoomControl) topLeftContainerDiv.appendChild(zoomControl);

if (typeof geolocateControl !== 'undefined') topLeftContainerDiv.appendChild(geolocateControl);
if (typeof measureControl !== 'undefined') topLeftContainerDiv.appendChild(measureControl);

var searchbar = document.getElementsByClassName('photon-geocoder-autocomplete ol-unselectable ol-control')[0];
if (searchbar) topLeftContainerDiv.appendChild(searchbar);

var searchLayerControl = document.getElementsByClassName('search-layer')[0];
if (searchLayerControl) topLeftContainerDiv.appendChild(searchLayerControl);

var layerSwitcherControl = document.getElementsByClassName('ol-layerswitcher')[0] || document.getElementsByClassName('layer-switcher')[0];
if (layerSwitcherControl) topRightContainerDiv.appendChild(layerSwitcherControl);

var scaleLineControl = document.getElementsByClassName('ol-scale-line')[0];
if (scaleLineControl) {
    scaleLineControl.className += ' ol-control';
    bottomLeftContainerDiv.appendChild(scaleLineControl);
}

var attributionControl = document.getElementsByClassName('bottom-attribution')[0];
if (attributionControl) bottomRightContainerDiv.appendChild(attributionControl);
