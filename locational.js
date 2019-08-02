function convertJson(_geoJson){
    return new FeatureCollection(_geoJson);
}

class Geometry extends Object{
    /**
     * 
     * @param {Object} _Geometry 
     * @param {string} _Geometry.type
     * @param {*[]} _Geometry.coordinates
     */
    constructor(_Geometry){
        super();
        this.type = _Geometry.type;
        this.coordinates = _Geometry.coordinates;
    }
}

class FeatureCollection extends Object {
    /**
     * 
     * @param {Object} _geoJson 
     * @param {string} _geoJson.type
     * @param {Feature[]} _geoJson.features
     */
    constructor(_geoJson){
        super();
        this.type = _geoJson.type;
        this.features = _geoJson.features.map(f => new Feature(f));
    }
}

class Feature extends Object{
    /**
     * 
     * @param {Object} _Feature 
     * @param {String} _Feature.type
     * @param {Geometry} _Feature.geometry
     * @param {Object} _Feature.properties
     */
    constructor(_Feature){
        super();
        this.type = "Feature"
        switch(_Feature.geometry.type){
            case 'Point':
                this.geometry = new Point(_Feature.geometry); 
            break;
            case 'Polygon':
                this.geometry = new Polygon(_Feature.geometry);
            break;
            case 'Stringline':
                this.geometry = new Stringline(_Feature.geometry);
            break;
        }
        this.properties = _Feature.properties;
    }
}

class Point extends Geometry{
    constructor(_Geometry){
        super(_Geometry);
    }
    within(poly){

    }
    intersects(line){

    }
    distanceFrom(item){

    }
}

class Polygon extends Geometry{
    constructor(_Geometry){
        super(_Geometry);
    }
    center(){
        var PI= 22/7;
	    var X=0;
	    var Y=0;
        var Z=0;
        this.coordinates.forEach((coord) => {
            lon1= coord[0];
            lat1= coord[1];
            lon1 = lon1 * PI/180;
            lat1 = lat1 * PI/180;
            X += Math.cos(lat1) * Math.cos(lon1);
            Y += Math.cos(lat1) * Math.sin(lon1);
            Z += Math.sin(lat1);
        });
        Lon = Math.atan2(Y, X)
        Hyp = Math.sqrt(X * X + Y * Y)
        Lat = Math.atan2(Z, Hyp)
        Lat = Lat * 180/PI
        Lon = Lon * 180/PI 

        return [Lon, Lat];
    }
    isValid(){

    }
    isSolid(){

    }
}

class Stringline extends Geometry{
    constructor(_Geometry){
        super(_Geometry);
    }
}
