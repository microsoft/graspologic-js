const DEFAULT_SETTINGS = {
    interpolationTimeRange: [10, 10000],
};
/**
 * @internal
 *
 * Attaches the "Display" settings to the given dat.gui instance for the given graph renderer
 * @param gui The GUI instance
 * @param renderer The graph renderer
 */
export function attachDisplaySettings(gui, renderer, { interpolationTimeRange = DEFAULT_SETTINGS.interpolationTimeRange, } = {}) {
    const folder = gui.addFolder('Display');
    folder.add(renderer.config, 'cornerAxes').name('Axes in Corner');
    folder.add(renderer.config, 'is3D').name('3D');
    folder.add(renderer.config, 'hideDeselected').name('Hide Deselected');
    folder
        .add(renderer.config, 'interpolationTime', interpolationTimeRange[0], interpolationTimeRange[1])
        .name('Interpolation Time');
    folder
        .addColor(renderer.config, 'hoverHighlightColor')
        .name('Highlight Color');
    return () => gui.removeFolder(folder);
}
