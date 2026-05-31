var wms_layers = [];


        var lyr_XYZLayer_0 = new ol.layer.Tile({
            'title': 'XYZ Layer',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: ' ',
                url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_regioni_1 = new ol.format.GeoJSON();
var features_regioni_1 = format_regioni_1.readFeatures(json_regioni_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_regioni_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_regioni_1.addFeatures(features_regioni_1);
var lyr_regioni_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_regioni_1, 
                style: style_regioni_1,
                popuplayertitle: 'regioni',
                interactive: true,
    title: 'regioni<br />\
    <img src="styles/legend/regioni_1_0.png" /> Abruzzo<br />\
    <img src="styles/legend/regioni_1_1.png" /> Basilicata<br />\
    <img src="styles/legend/regioni_1_2.png" /> Calabria<br />\
    <img src="styles/legend/regioni_1_3.png" /> Campania<br />\
    <img src="styles/legend/regioni_1_4.png" /> Emilia-Romagna<br />\
    <img src="styles/legend/regioni_1_5.png" /> Friuli-Venezia Giulia<br />\
    <img src="styles/legend/regioni_1_6.png" /> Lazio<br />\
    <img src="styles/legend/regioni_1_7.png" /> Liguria<br />\
    <img src="styles/legend/regioni_1_8.png" /> Lombardia<br />\
    <img src="styles/legend/regioni_1_9.png" /> Marche<br />\
    <img src="styles/legend/regioni_1_10.png" /> Molise<br />\
    <img src="styles/legend/regioni_1_11.png" /> Piemonte<br />\
    <img src="styles/legend/regioni_1_12.png" /> Puglia<br />\
    <img src="styles/legend/regioni_1_13.png" /> Sardegna<br />\
    <img src="styles/legend/regioni_1_14.png" /> Sicilia<br />\
    <img src="styles/legend/regioni_1_15.png" /> Toscana<br />\
    <img src="styles/legend/regioni_1_16.png" /> Trentino-Alto Adige/Südtirol<br />\
    <img src="styles/legend/regioni_1_17.png" /> Umbria<br />\
    <img src="styles/legend/regioni_1_18.png" /> Valle d\'Aosta/Vallée d\'Aoste<br />\
    <img src="styles/legend/regioni_1_19.png" /> Veneto<br />\
    <img src="styles/legend/regioni_1_20.png" /> <br />' });
var format_unitaterritorialisovracomunali_2 = new ol.format.GeoJSON();
var features_unitaterritorialisovracomunali_2 = format_unitaterritorialisovracomunali_2.readFeatures(json_unitaterritorialisovracomunali_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_unitaterritorialisovracomunali_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_unitaterritorialisovracomunali_2.addFeatures(features_unitaterritorialisovracomunali_2);
var lyr_unitaterritorialisovracomunali_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_unitaterritorialisovracomunali_2, 
                style: style_unitaterritorialisovracomunali_2,
                popuplayertitle: 'unita-territoriali-sovracomunali',
                interactive: true,
    title: 'unita-territoriali-sovracomunali<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_0.png" /> Abruzzo<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_1.png" /> Basilicata<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_2.png" /> Calabria<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_3.png" /> Campania<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_4.png" /> Emilia-Romagna<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_5.png" /> Friuli-Venezia Giulia<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_6.png" /> Lazio<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_7.png" /> Liguria<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_8.png" /> Lombardia<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_9.png" /> Marche<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_10.png" /> Molise<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_11.png" /> Piemonte<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_12.png" /> Puglia<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_13.png" /> Sardegna<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_14.png" /> Sicilia<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_15.png" /> Toscana<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_16.png" /> Trentino-Alto Adige/Südtirol<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_17.png" /> Umbria<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_18.png" /> Valle d\'Aosta/Vallée d\'Aoste<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_19.png" /> Veneto<br />\
    <img src="styles/legend/unitaterritorialisovracomunali_2_20.png" /> <br />' });
var format_comuni_3 = new ol.format.GeoJSON();
var features_comuni_3 = format_comuni_3.readFeatures(json_comuni_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_comuni_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_comuni_3.addFeatures(features_comuni_3);
var lyr_comuni_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_comuni_3, 
                style: style_comuni_3,
                popuplayertitle: 'comuni',
                interactive: true,
    title: 'comuni<br />\
    <img src="styles/legend/comuni_3_0.png" /> Abruzzo<br />\
    <img src="styles/legend/comuni_3_1.png" /> Basilicata<br />\
    <img src="styles/legend/comuni_3_2.png" /> Calabria<br />\
    <img src="styles/legend/comuni_3_3.png" /> Campania<br />\
    <img src="styles/legend/comuni_3_4.png" /> Emilia-Romagna<br />\
    <img src="styles/legend/comuni_3_5.png" /> Friuli-Venezia Giulia<br />\
    <img src="styles/legend/comuni_3_6.png" /> Lazio<br />\
    <img src="styles/legend/comuni_3_7.png" /> Liguria<br />\
    <img src="styles/legend/comuni_3_8.png" /> Lombardia<br />\
    <img src="styles/legend/comuni_3_9.png" /> Marche<br />\
    <img src="styles/legend/comuni_3_10.png" /> Molise<br />\
    <img src="styles/legend/comuni_3_11.png" /> Piemonte<br />\
    <img src="styles/legend/comuni_3_12.png" /> Puglia<br />\
    <img src="styles/legend/comuni_3_13.png" /> Sardegna<br />\
    <img src="styles/legend/comuni_3_14.png" /> Sicilia<br />\
    <img src="styles/legend/comuni_3_15.png" /> Toscana<br />\
    <img src="styles/legend/comuni_3_16.png" /> Trentino-Alto Adige/Südtirol<br />\
    <img src="styles/legend/comuni_3_17.png" /> Umbria<br />\
    <img src="styles/legend/comuni_3_18.png" /> Valle d\'Aosta/Vallée d\'Aoste<br />\
    <img src="styles/legend/comuni_3_19.png" /> Veneto<br />\
    <img src="styles/legend/comuni_3_20.png" /> <br />' });
var format_museiguidavol2_4 = new ol.format.GeoJSON();
var features_museiguidavol2_4 = format_museiguidavol2_4.readFeatures(json_museiguidavol2_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_museiguidavol2_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_museiguidavol2_4.addFeatures(features_museiguidavol2_4);
var lyr_museiguidavol2_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_museiguidavol2_4, 
                style: style_museiguidavol2_4,
                popuplayertitle: 'museiguidavol2',
                interactive: true,
                title: '<img src="styles/legend/museiguidavol2_4.png" /> museiguidavol2'
            });
var format_sitiguidavol2_5 = new ol.format.GeoJSON();
var features_sitiguidavol2_5 = format_sitiguidavol2_5.readFeatures(json_sitiguidavol2_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_sitiguidavol2_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_sitiguidavol2_5.addFeatures(features_sitiguidavol2_5);
cluster_sitiguidavol2_5 = new ol.source.Cluster({
  distance: 30,
  source: jsonSource_sitiguidavol2_5
});
var lyr_sitiguidavol2_5 = new ol.layer.Vector({
                declutter: false,
                source:cluster_sitiguidavol2_5, 
                style: style_sitiguidavol2_5,
                popuplayertitle: 'sitiguidavol2',
                interactive: true,
                title: 'sitiguidavol2'
            });
var lyr_IdrografiaReticoloidrografico_6 = new ol.layer.Tile({
                            source: new ol.source.TileWMS(({
                              url: "http://sdi.isprambiente.it/geoserver/hy/wms?version%3D1.3.0",
                              attributions: ' ',
                              params: {
                                "LAYERS": "reticolo_idrografico",
                                "TILED": "true",
                                "VERSION": "1.3.0"},
                            })),
                            title: 'Idrografia - Reticolo idrografico',
                            popuplayertitle: 'Idrografia - Reticolo idrografico',
                            type: '',
                            opacity: 1.000000,
                            
maxResolution:251.60612614499766,

                            minResolution:53.66943920216396,

                          });
              wms_layers.push([lyr_IdrografiaReticoloidrografico_6, 1]);

lyr_XYZLayer_0.setVisible(true);lyr_regioni_1.setVisible(true);lyr_unitaterritorialisovracomunali_2.setVisible(true);lyr_comuni_3.setVisible(false);lyr_museiguidavol2_4.setVisible(true);lyr_sitiguidavol2_5.setVisible(true);lyr_IdrografiaReticoloidrografico_6.setVisible(false);
var layersList = [lyr_XYZLayer_0,lyr_regioni_1,lyr_unitaterritorialisovracomunali_2,lyr_comuni_3,lyr_museiguidavol2_4,lyr_sitiguidavol2_5,lyr_IdrografiaReticoloidrografico_6];
lyr_regioni_1.set('fieldAliases', {'fid': 'fid', 'pkuid': 'pkuid', 'cod_rip': 'cod_rip', 'cod_reg': 'cod_reg', 'den_reg': 'den_reg', 'shape_leng': 'shape_leng', 'shape_area': 'shape_area', 'den_rip': 'den_rip', 'ontopia': 'ontopia', });
lyr_unitaterritorialisovracomunali_2.set('fieldAliases', {'fid': 'fid', 'pkuid': 'pkuid', 'cod_rip': 'cod_rip', 'cod_reg': 'cod_reg', 'cod_prov': 'cod_prov', 'cod_cm': 'cod_cm', 'cod_uts': 'cod_uts', 'den_prov': 'den_prov', 'den_cm': 'den_cm', 'den_uts': 'den_uts', 'sigla': 'sigla', 'tipo_uts': 'tipo_uts', 'shape_leng': 'shape_leng', 'shape_area': 'shape_area', 'den_reg': 'den_reg', 'den_rip': 'den_rip', 'ontopia': 'ontopia', });
lyr_comuni_3.set('fieldAliases', {'fid': 'fid', 'pkuid': 'pkuid', 'objectid': 'objectid', 'cod_rip': 'cod_rip', 'cod_reg': 'cod_reg', 'cod_prov': 'cod_prov', 'cod_cm': 'cod_cm', 'cod_uts': 'cod_uts', 'pro_com': 'pro_com', 'pro_com_t': 'pro_com_t', 'comune': 'comune', 'comune_a': 'comune_a', 'cc_uts': 'cc_uts', 'shape_leng': 'shape_leng', 'shape_le_1': 'shape_le_1', 'shape_area': 'shape_area', 'den_cm': 'den_cm', 'den_prov': 'den_prov', 'den_reg': 'den_reg', 'den_rip': 'den_rip', 'den_uts': 'den_uts', 'ontopia': 'ontopia', 'sigla': 'sigla', 'tipo_uts': 'tipo_uts', });
lyr_museiguidavol2_4.set('fieldAliases', {'id_Reg': 'id_Reg', 'Regione': 'Regione', 'ID museoxr': 'ID museoxr', 'Museo': 'Museo', 'Comune': 'Comune', 'Sezione': 'Sezione', 'Lat': 'Lat', 'Long': 'Long', });
lyr_sitiguidavol2_5.set('fieldAliases', {'ID_Reg': 'ID_Reg', 'Regione': 'Regione', 'ID_sitoxre': 'ID_sitoxre', 'ID_sitotot': 'ID_sitotot', 'Sito/Museo': 'Sito/Museo', 'Comune/Loc': 'Comune/Loc', 'Provincia': 'Provincia', 'Sezione': 'Sezione', 'Lat': 'Lat', 'Long': 'Long', 'LINK': 'LINK', 'LINK 2': 'LINK 2', 'LINK 3': 'LINK 3', 'LINK 4': 'LINK 4', });
lyr_regioni_1.set('fieldImages', {'fid': 'TextEdit', 'pkuid': 'TextEdit', 'cod_rip': 'TextEdit', 'cod_reg': 'TextEdit', 'den_reg': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_area': 'TextEdit', 'den_rip': 'TextEdit', 'ontopia': 'TextEdit', });
lyr_unitaterritorialisovracomunali_2.set('fieldImages', {'fid': 'TextEdit', 'pkuid': 'TextEdit', 'cod_rip': 'TextEdit', 'cod_reg': 'TextEdit', 'cod_prov': 'TextEdit', 'cod_cm': 'TextEdit', 'cod_uts': 'TextEdit', 'den_prov': 'TextEdit', 'den_cm': 'TextEdit', 'den_uts': 'TextEdit', 'sigla': 'TextEdit', 'tipo_uts': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_area': 'TextEdit', 'den_reg': 'TextEdit', 'den_rip': 'TextEdit', 'ontopia': 'TextEdit', });
lyr_comuni_3.set('fieldImages', {'fid': 'TextEdit', 'pkuid': 'TextEdit', 'objectid': 'TextEdit', 'cod_rip': 'TextEdit', 'cod_reg': 'TextEdit', 'cod_prov': 'TextEdit', 'cod_cm': 'TextEdit', 'cod_uts': 'TextEdit', 'pro_com': 'TextEdit', 'pro_com_t': 'TextEdit', 'comune': 'TextEdit', 'comune_a': 'TextEdit', 'cc_uts': 'TextEdit', 'shape_leng': 'TextEdit', 'shape_le_1': 'TextEdit', 'shape_area': 'TextEdit', 'den_cm': 'TextEdit', 'den_prov': 'TextEdit', 'den_reg': 'TextEdit', 'den_rip': 'TextEdit', 'den_uts': 'TextEdit', 'ontopia': 'TextEdit', 'sigla': 'TextEdit', 'tipo_uts': 'TextEdit', });
lyr_museiguidavol2_4.set('fieldImages', {'id_Reg': 'Range', 'Regione': 'TextEdit', 'ID museoxr': 'TextEdit', 'Museo': 'TextEdit', 'Comune': 'TextEdit', 'Sezione': 'TextEdit', 'Lat': 'TextEdit', 'Long': 'TextEdit', });
lyr_sitiguidavol2_5.set('fieldImages', {'ID_Reg': 'Range', 'Regione': 'TextEdit', 'ID_sitoxre': 'TextEdit', 'ID_sitotot': 'TextEdit', 'Sito/Museo': 'TextEdit', 'Comune/Loc': 'TextEdit', 'Provincia': 'TextEdit', 'Sezione': 'TextEdit', 'Lat': 'TextEdit', 'Long': 'TextEdit', 'LINK': '', 'LINK 2': '', 'LINK 3': '', 'LINK 4': '', });
lyr_regioni_1.set('fieldLabels', {'fid': 'hidden field', 'pkuid': 'hidden field', 'cod_rip': 'hidden field', 'cod_reg': 'hidden field', 'den_reg': 'inline label - visible with data', 'shape_leng': 'hidden field', 'shape_area': 'hidden field', 'den_rip': 'hidden field', 'ontopia': 'hidden field', });
lyr_unitaterritorialisovracomunali_2.set('fieldLabels', {'fid': 'hidden field', 'pkuid': 'hidden field', 'cod_rip': 'hidden field', 'cod_reg': 'hidden field', 'cod_prov': 'hidden field', 'cod_cm': 'hidden field', 'cod_uts': 'hidden field', 'den_prov': 'hidden field', 'den_cm': 'hidden field', 'den_uts': 'inline label - visible with data', 'sigla': 'hidden field', 'tipo_uts': 'hidden field', 'shape_leng': 'hidden field', 'shape_area': 'hidden field', 'den_reg': 'inline label - visible with data', 'den_rip': 'hidden field', 'ontopia': 'hidden field', });
lyr_comuni_3.set('fieldLabels', {'fid': 'hidden field', 'pkuid': 'hidden field', 'objectid': 'hidden field', 'cod_rip': 'hidden field', 'cod_reg': 'hidden field', 'cod_prov': 'hidden field', 'cod_cm': 'hidden field', 'cod_uts': 'hidden field', 'pro_com': 'hidden field', 'pro_com_t': 'hidden field', 'comune': 'inline label - visible with data', 'comune_a': 'hidden field', 'cc_uts': 'hidden field', 'shape_leng': 'hidden field', 'shape_le_1': 'hidden field', 'shape_area': 'hidden field', 'den_cm': 'hidden field', 'den_prov': 'hidden field', 'den_reg': 'hidden field', 'den_rip': 'hidden field', 'den_uts': 'inline label - visible with data', 'ontopia': 'hidden field', 'sigla': 'hidden field', 'tipo_uts': 'hidden field', });
lyr_museiguidavol2_4.set('fieldLabels', {'id_Reg': 'hidden field', 'Regione': 'inline label - visible with data', 'ID museoxr': 'hidden field', 'Museo': 'inline label - visible with data', 'Comune': 'inline label - visible with data', 'Sezione': 'hidden field', 'Lat': 'hidden field', 'Long': 'hidden field', });
lyr_sitiguidavol2_5.set('fieldLabels', {'ID_Reg': 'hidden field', 'Regione': 'inline label - visible with data', 'ID_sitoxre': 'hidden field', 'ID_sitotot': 'hidden field', 'Sito/Museo': 'inline label - visible with data', 'Comune/Loc': 'inline label - visible with data', 'Provincia': 'inline label - visible with data', 'Sezione': 'hidden field', 'Lat': 'hidden field', 'Long': 'hidden field', 'LINK': 'inline label - visible with data', 'LINK 2': 'inline label - visible with data', 'LINK 3': 'inline label - visible with data', 'LINK 4': 'inline label - visible with data', });
lyr_sitiguidavol2_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});