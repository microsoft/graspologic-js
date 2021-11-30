/**
 * @internal
 *
 * The default set of configuration options for the layout
 */
export const DEFAULT_CONFIGURATION = Object.freeze({
  emitDensitySnapshots: false,
  densitySnapshotSamplingRate: 4,
  edgeCut: 0.8,
  schedule: {}
});
/**
 * @internal
 *
 * The phase of the layout
 */

export var AnnealingPhase;

(function (AnnealingPhase) {
  AnnealingPhase[AnnealingPhase["Initial"] = 0] = "Initial";
  AnnealingPhase[AnnealingPhase["Liquid"] = 1] = "Liquid";
  AnnealingPhase[AnnealingPhase["Expansion"] = 2] = "Expansion";
  AnnealingPhase[AnnealingPhase["Cooldown"] = 3] = "Cooldown";
  AnnealingPhase[AnnealingPhase["Crunch"] = 4] = "Crunch";
  AnnealingPhase[AnnealingPhase["Simmer"] = 5] = "Simmer";
  AnnealingPhase[AnnealingPhase["Complete"] = 6] = "Complete";
})(AnnealingPhase || (AnnealingPhase = {}));
/**
 * @internal
 *
 * Gets a user friendly string of the given annealing phase
 * @param input The annealing phase
 */


export function getAnnealingPhaseString(input) {
  switch (input) {
    case AnnealingPhase.Initial:
      return 'initial';

    case AnnealingPhase.Liquid:
      return 'liquid';

    case AnnealingPhase.Expansion:
      return 'expansion';

    case AnnealingPhase.Cooldown:
      return 'cooldown';

    case AnnealingPhase.Crunch:
      return 'crunch';

    case AnnealingPhase.Simmer:
      return 'simmer';

    default:
      return 'unknown';
  }
}
export var NodeUpdateKind;

(function (NodeUpdateKind) {
  NodeUpdateKind[NodeUpdateKind["CentroidJump"] = 0] = "CentroidJump";
  NodeUpdateKind[NodeUpdateKind["RandomJump"] = 1] = "RandomJump";
})(NodeUpdateKind || (NodeUpdateKind = {}));