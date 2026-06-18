var wms_layers = [];

var lyr_XYZLayer_0 = new ol.layer.Tile({
    'title': 'XYZ Layer',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
    })
}); // <-- AGGIUNTO QUESTO (Chiusura corretta di lyr_XYZLayer_0)

var lyr_Satellite_0 = new ol.layer.Tile({
    'title': 'Satellite (Google)',
    'opacity': 1.000000,
    source: new ol.source.XYZ({
        attributions: ' ',
        url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}' // Satellite con etichette stradali
    })
});var format_regioni_1 = new ol.format.GeoJSON();
var features_regioni_1 = format_regioni_1.readFeatures(json_regioni_1, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_regioni_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_regioni_1.addFeatures(features_regioni_1);
var lyr_regioni_1 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_regioni_1, 
    style: style_regioni_1,
    popuplayertitle: 'regioni',
    interactive: true,
    title: 'Regioni'
});

var format_unitaterritorialisovracomunali_2 = new ol.format.GeoJSON();
var features_unitaterritorialisovracomunali_2 = format_unitaterritorialisovracomunali_2.readFeatures(json_unitaterritorialisovracomunali_2, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_unitaterritorialisovracomunali_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_unitaterritorialisovracomunali_2.addFeatures(features_unitaterritorialisovracomunali_2);
var lyr_unitaterritorialisovracomunali_2 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_unitaterritorialisovracomunali_2, 
    style: style_unitaterritorialisovracomunali_2,
    popuplayertitle: 'Provincie',
    interactive: true,
    title: 'Provincie (UTS)'
});

var format_museiguidavol2_4 = new ol.format.GeoJSON();
var features_museiguidavol2_4 = format_museiguidavol2_4.readFeatures(json_museiguidavol2_4, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_museiguidavol2_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_museiguidavol2_4.addFeatures(features_museiguidavol2_4);
var lyr_museiguidavol2_4 = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_museiguidavol2_4, 
    style: style_museiguidavol2_4,
    popuplayertitle: 'Musei',
    interactive: true,
    title: 'Musei'
});

var format_sitiguidavol2_5 = new ol.format.GeoJSON();
var features_sitiguidavol2_5 = format_sitiguidavol2_5.readFeatures(json_sitiguidavol2_5, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_sitiguidavol2_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_sitiguidavol2_5.addFeatures(features_sitiguidavol2_5);

// --- BLOCCO CLUSTER CORRETTO E UNIFICATO ---
cluster_sitiguidavol2_5 = new ol.source.Cluster({
    distance: 30,
    source: jsonSource_sitiguidavol2_5,
    
    geometryFunction: function(feature) {
        if (!feature || !feature.getGeometry()) {
            return null;
        }
        return feature.getGeometry();
    },
    
    createCluster: function(point, features) {
        if (!features || features.length === 0) {
            return new ol.Feature({
                geometry: point,
                features: []
            });
        }
        
        var primoPunto = features[0];
        if (!primoPunto || typeof primoPunto.get !== 'function') {
            return new ol.Feature({
                geometry: point,
                features: features
            });
        }
        
        var regioneTarget = primoPunto.get('Regione');
        
        var featuresFiltrate = features.filter(function(f) {
            return f && typeof f.get === 'function' && f.get('Regione') === regioneTarget;
        });
        
        if (featuresFiltrate.length === 0) {
            return new ol.Feature({
                geometry: point,
                features: []
            });
        }
        
        var x = 0, y = 0;
        var puntiValidi = 0;
        
        featuresFiltrate.forEach(function(f) {
            if (f && f.getGeometry() && typeof f.getGeometry().getCoordinates === 'function') {
                var coord = f.getGeometry().getCoordinates();
                if (coord && Array.isArray(coord) && coord.length >= 2) {
                    x += coord[0];
                    y += coord[1];
                    puntiValidi++;
                }
            }
        });
        
        var centroCluster = puntiValidi > 0 ? [x / puntiValidi, y / puntiValidi] : point.getCoordinates();
        
        return new ol.Feature({
            geometry: new ol.geom.Point(centroCluster),
            features: featuresFiltrate
        });
    }
}); // <-- Chiusura corretta del cluster, senza duplicati!

var lyr_sitiguidavol2_5 = new ol.layer.Vector({
    declutter: false,
    source: cluster_sitiguidavol2_5, 
    style: style_sitiguidavol2_5,
    popuplayertitle: 'Siti',
    interactive: true,
    title: 'Siti'
});

// --- NUOVO LAYER: sititecnicopratica ---
var format_sititecnicopratica = new ol.format.GeoJSON();
var features_sititecnicopratica = format_sititecnicopratica.readFeatures(json_tecnicopratica_5, 
    {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_sititecnicopratica = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_sititecnicopratica.addFeatures(features_sititecnicopratica);
var lyr_sititecnicopratica = new ol.layer.Vector({
    declutter: false,
    source: jsonSource_sititecnicopratica, 
    style: style_sititecnicopratica, 
    popuplayertitle: 'Siti Tecnico Pratica',
    interactive: true,
    title: 'Siti Tecnico Pratica'
});

var lyr_IdrografiaReticoloidrografico_6 = new ol.layer.Tile({
    source: new ol.source.TileWMS(({
        url: "http://sdi.isprambiente.it/geoserver/hy/wms?version%3D1.3.0",
        attributions: ' ',
        params: {
            "LAYERS": "reticolo_idrografico",
            "TILED": "true",
            "VERSION": "1.3.0"
        },
    })),
    title: 'Idrografia - Reticolo idrografico',
    popuplayertitle: 'Idrografia - Reticolo idrografico',
    type: '',
    opacity: 1.000000,
    maxResolution: 251.60612614499766,
    minResolution: 53.66943920216396,
});

wms_layers.push([lyr_IdrografiaReticoloidrografico_6, 1]);

// Visibilità (Impostato su true/false)
lyr_XYZLayer_0.setVisible(true);
lyr_Satellite_0.setVisible(false);
lyr_regioni_1.setVisible(true);
lyr_unitaterritorialisovracomunali_2.setVisible(true);
lyr_museiguidavol2_4.setVisible(true);
lyr_sitiguidavol2_5.setVisible(true);
lyr_sititecnicopratica.setVisible(true); 
lyr_IdrografiaReticoloidrografico_6.setVisible(false);

// Lista dei Layers (SENZA "var" davanti e scritta su una riga pulita)
layersList = [lyr_XYZLayer_0, lyr_Satellite_0, lyr_regioni_1, lyr_unitaterritorialisovracomunali_2, lyr_museiguidavol2_4, lyr_sitiguidavol2_5, lyr_sititecnicopratica, lyr_IdrografiaReticoloidrografico_6];
lyr_regioni_1.set('fieldAliases', {'fid': 'fid', 'pkuid': 'pkuid', 'cod_rip': 'cod_rip', 'cod_reg': 'cod_reg', 'den_reg': 'den_reg', 'shape_leng': 'shape_leng', 'shape_area': 'shape_area', 'den_rip': 'den_rip', 'ontopia': 'ontopia', });
lyr_unitaterritorialisovracomunali_2.set('fieldAliases', {'fid': 'fid', 'pkuid': 'pkuid', 'cod_rip': 'cod_rip', 'cod_reg': 'cod_reg', 'cod_prov': 'cod_prov', 'cod_cm': 'cod_cm', 'cod_uts': 'cod_uts', 'den_prov': 'den_prov', 'den_cm': 'den_cm', 'den_uts': 'den_uts', 'sigla': 'sigla', 'tipo_uts': 'tipo_uts', 'shape_leng': 'shape_leng', 'shape_area': 'shape_area', 'den_reg': 'den_reg', 'den_rip': 'den_rip', 'ontopia': 'ontopia', });
lyr_museiguidavol2_4.set('fieldAliases', {'id_Reg': 'id_Reg', 'Regione': 'Regione', 'ID museoxr': 'ID museoxr', 'Museo': 'Museo', 'Comune': 'Comune', 'Sezione': 'Sezione', 'Lat': 'Lat', 'Long': 'Long', 'Provincia': 'Provincia', });
lyr_sitiguidavol2_5.set('fieldAliases', {'ID_Reg': 'ID_Reg', 'Regione': 'Regione', 'ID_sitoxre': 'ID_sitoxre', 'ID_sitotot': 'ID_sitotot', 'Sito/Museo': 'Sito/Museo', 'Comune/Loc': 'Comune/Loc', 'Provincia': 'Provincia', 'Sezione': 'Sezione', 'Lat': 'Lat', 'Long': 'Long', 'LINK': 'LINK', 'LINK 2': 'LINK 2', 'LINK 3': 'LINK 3', 'LINK 4': 'LINK 4', });

lyr_sititecnicopratica.set('fieldAliases', {
    'ID_Reg': 'ID Regione', 
    'Regione': 'Regione', 
    'ID_sitoxre': 'ID Sito Xre', 
    'ID_sitotot': 'ID Sito Tot', 
    'Sito/Museo': 'Sito/Museo', 
    'Comune/Loc': 'Comune/Loc', 
    'Provincia': 'Provincia', 
    'Sezione': 'Sezione', 
    'Lat': 'Lat', 
    'Long': 'Long', 
    'LINK': 'LINK', 
    'LINK 2': 'LINK 2', 
    'LINK 3': 'LINK 3', 
    'LINK 4': 'LINK 4'
});

lyr_regioni_1.set('fieldImages', {'fid': 'TextEdit', 'pkuid': 'TextEdit', 'cod_rip': 'TextEdit', 'cod_reg': 'TextEdit', 'den_reg': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_area': 'TextEdit', 'den_rip': 'TextEdit', 'ontopia': 'TextEdit', });
lyr_unitaterritorialisovracomunali_2.set('fieldImages', {'fid': 'TextEdit', 'pkuid': 'TextEdit', 'cod_rip': 'TextEdit', 'cod_reg': 'TextEdit', 'cod_prov': 'TextEdit', 'cod_cm': 'TextEdit', 'cod_uts': 'TextEdit', 'den_prov': 'TextEdit', 'den_cm': 'TextEdit', 'den_uts': 'TextEdit', 'sigla': 'TextEdit', 'tipo_uts': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_area': 'TextEdit', 'den_reg': 'TextEdit', 'den_rip': 'TextEdit', 'ontopia': 'TextEdit', });
lyr_museiguidavol2_4.set('fieldImages', {'id_Reg': 'Range', 'Regione': 'TextEdit', 'ID museoxr': 'TextEdit', 'Museo': 'TextEdit', 'Comune': 'TextEdit', 'Sezione': 'TextEdit', 'Lat': 'TextEdit', 'Long': 'TextEdit', 'Provincia': 'TextEdit', });
lyr_sitiguidavol2_5.set('fieldImages', {'ID_Reg': 'Range', 'Regione': 'TextEdit', 'ID_sitoxre': 'TextEdit', 'ID_sitotot': 'TextEdit', 'Sito/Museo': 'TextEdit', 'Comune/Loc': 'TextEdit', 'Provincia': 'TextEdit', 'Sezione': 'TextEdit', 'Lat': 'TextEdit', 'Long': 'TextEdit', 'LINK': '', 'LINK 2': '', 'LINK 3': '', 'LINK 4': '', });

lyr_sititecnicopratica.set('fieldImages', {
    'ID_Reg': 'Range', 
    'Regione': 'TextEdit', 
    'ID_sitoxre': 'TextEdit', 
    'ID_sitotot': 'TextEdit', 
    'Sito/Museo': 'TextEdit', 
    'Comune/Loc': 'TextEdit', 
    'Provincia': 'TextEdit', 
    'Sezione': 'TextEdit', 
    'Lat': 'TextEdit', 
    'Long': 'TextEdit', 
    'LINK': 'TextEdit', 
    'LINK 2': 'TextEdit', 
    'LINK 3': 'TextEdit', 
    'LINK 4': 'TextEdit'
});

lyr_regioni_1.set('fieldLabels', {'fid': 'hidden field', 'pkuid': 'hidden field', 'cod_rip': 'hidden field', 'cod_reg': 'hidden field', 'den_reg': 'inline label - visible with data', 'shape_leng': 'hidden field', 'shape_area': 'hidden field', 'den_rip': 'hidden field', 'ontopia': 'hidden field', });
lyr_unitaterritorialisovracomunali_2.set('fieldLabels', {'fid': 'hidden field', 'pkuid': 'hidden field', 'cod_rip': 'hidden field', 'cod_reg': 'hidden field', 'cod_prov': 'hidden field', 'cod_cm': 'hidden field', 'cod_uts': 'hidden field', 'den_prov': 'hidden field', 'den_cm': 'hidden field', 'den_uts': 'inline label - visible with data', 'sigla': 'hidden field', 'tipo_uts': 'hidden field', 'shape_leng': 'hidden field', 'shape_area': 'hidden field', 'den_reg': 'inline label - visible with data', 'den_rip': 'hidden field', 'ontopia': 'hidden field', });
lyr_museiguidavol2_4.set('fieldLabels', {'id_Reg': 'hidden field', 'Regione': 'inline label - visible with data', 'ID museoxr': 'hidden field', 'Museo': 'inline label - visible with data', 'Comune': 'inline label - visible with data', 'Provincia': 'inline label - visible with data','Sezione': 'inline label - visible with data', 'Lat': 'hidden field', 'Long': 'hidden field', });
lyr_sitiguidavol2_5.set('fieldLabels', {'ID_Reg': 'hidden field', 'Regione': 'inline label - visible with data', 'ID_sitoxre': 'hidden field', 'ID_sitotot': 'hidden field', 'Sito/Museo': 'inline label - visible with data', 'Comune/Loc': 'inline label - visible with data', 'Provincia': 'inline label - visible with data', 'Sezione': 'hidden field', 'Lat': 'hidden field', 'Long': 'hidden field', 'LINK': 'inline label - visible with data', 'LINK 2': 'inline label - visible with data', 'LINK 3': 'inline label - visible with data', 'LINK 4': 'inline label - visible with data', });

lyr_sititecnicopratica.set('fieldLabels', {
    'ID_Reg': 'hidden field', 
    'Regione': 'inline label - visible with data', 
    'ID_sitoxre': 'hidden field', 
    'ID_sitotot': 'hidden field', 
    'Sito/Museo': 'inline label - visible with data', 
    'Comune/Loc': 'inline label - visible with data', 
    'Provincia': 'inline label - visible with data', 
    'Sezione': 'hidden field', 
    'Lat': 'hidden field', 
    'Long': 'hidden field', 
    'LINK': 'inline label - visible with data', 
    'LINK 2': 'inline label - visible with data', 
    'LINK 3': 'inline label - visible with data', 
    'LINK 4': 'inline label - visible with data'
});

lyr_sitiguidavol2_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});
