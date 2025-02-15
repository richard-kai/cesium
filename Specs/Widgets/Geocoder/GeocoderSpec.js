define([
        'Widgets/Geocoder/Geocoder',
        'Core/Cartesian3',
        'Specs/createScene',
        'ThirdParty/when'
    ], function(
        Geocoder,
        Cartesian3,
        createScene,
        when) {
        'use strict';

describe('Widgets/Geocoder/Geocoder', function() {

    var scene;

    beforeEach(function() {
        scene = createScene();
    });

    afterEach(function() {
        scene.destroyForSpecs();
    });

    it('constructor sets expected properties', function() {
        var flightDuration = 1234;
        var destinationFound = jasmine.createSpy();

        var geocoder = new Geocoder({
            container : document.body,
            scene : scene,
            flightDuration : flightDuration,
            destinationFound : destinationFound
        });

        var viewModel = geocoder.viewModel;
        expect(viewModel.scene).toBe(scene);
        expect(viewModel.flightDuration).toBe(flightDuration);
        expect(viewModel.destinationFound).toBe(destinationFound);
        geocoder.destroy();
    });

    it('can create and destroy', function() {
        var container = document.createElement('div');
        container.id = 'testContainer';
        document.body.appendChild(container);

        var widget = new Geocoder({
            container : 'testContainer',
            scene : scene
        });
        expect(widget.container).toBe(container);
        expect(widget.isDestroyed()).toEqual(false);
        expect(container.children.length).not.toEqual(0);
        widget.destroy();
        expect(container.children.length).toEqual(0);
        expect(widget.isDestroyed()).toEqual(true);

        document.body.removeChild(container);
    });

    it('constructor throws with no scene', function() {
        expect(function() {
            return new Geocoder({
                container : document.body
            });
        }).toThrowDeveloperError();
    });

    it('constructor throws with no element', function() {
        expect(function() {
            return new Geocoder({
                scene : scene
            });
        }).toThrowDeveloperError();
    });

    it('constructor throws with string element that does not exist', function() {
        expect(function() {
            return new Geocoder({
                container : 'does not exist',
                scene : scene
            });
        }).toThrowDeveloperError();
    });
}, 'WebGL');
});
