"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NodeUpdateKind = exports.DEFAULT_CONFIGURATION = exports.AnnealingPhase = void 0;
exports.getAnnealingPhaseString = getAnnealingPhaseString;

/**
 * @internal
 *
 * The default set of configuration options for the layout
 */
const DEFAULT_CONFIGURATION = Object.freeze({
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

exports.DEFAULT_CONFIGURATION = DEFAULT_CONFIGURATION;
var AnnealingPhase;
exports.AnnealingPhase = AnnealingPhase;

(function (AnnealingPhase) {
  AnnealingPhase[AnnealingPhase["Initial"] = 0] = "Initial";
  AnnealingPhase[AnnealingPhase["Liquid"] = 1] = "Liquid";
  AnnealingPhase[AnnealingPhase["Expansion"] = 2] = "Expansion";
  AnnealingPhase[AnnealingPhase["Cooldown"] = 3] = "Cooldown";
  AnnealingPhase[AnnealingPhase["Crunch"] = 4] = "Crunch";
  AnnealingPhase[AnnealingPhase["Simmer"] = 5] = "Simmer";
  AnnealingPhase[AnnealingPhase["Complete"] = 6] = "Complete";
})(AnnealingPhase || (exports.AnnealingPhase = AnnealingPhase = {}));
/**
 * @internal
 *
 * Gets a user friendly string of the given annealing phase
 * @param input The annealing phase
 */


function getAnnealingPhaseString(input) {
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

var NodeUpdateKind;
exports.NodeUpdateKind = NodeUpdateKind;

(function (NodeUpdateKind) {
  NodeUpdateKind[NodeUpdateKind["CentroidJump"] = 0] = "CentroidJump";
  NodeUpdateKind[NodeUpdateKind["RandomJump"] = 1] = "RandomJump";
})(NodeUpdateKind || (exports.NodeUpdateKind = NodeUpdateKind = {}));