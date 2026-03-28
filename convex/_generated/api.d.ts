/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions_generateBriefing from "../actions/generateBriefing.js";
import type * as actions_generateLinkedinDraft from "../actions/generateLinkedinDraft.js";
import type * as actions_generatePipelineInsights from "../actions/generatePipelineInsights.js";
import type * as crons from "../crons.js";
import type * as mutations_briefings from "../mutations/briefings.js";
import type * as mutations_linkedin from "../mutations/linkedin.js";
import type * as mutations_referrals from "../mutations/referrals.js";
import type * as queries_briefings from "../queries/briefings.js";
import type * as queries_dashboard from "../queries/dashboard.js";
import type * as queries_linkedin from "../queries/linkedin.js";
import type * as queries_referrals from "../queries/referrals.js";
import type * as seed from "../seed.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  "actions/generateBriefing": typeof actions_generateBriefing;
  "actions/generateLinkedinDraft": typeof actions_generateLinkedinDraft;
  "actions/generatePipelineInsights": typeof actions_generatePipelineInsights;
  crons: typeof crons;
  "mutations/briefings": typeof mutations_briefings;
  "mutations/linkedin": typeof mutations_linkedin;
  "mutations/referrals": typeof mutations_referrals;
  "queries/briefings": typeof queries_briefings;
  "queries/dashboard": typeof queries_dashboard;
  "queries/linkedin": typeof queries_linkedin;
  "queries/referrals": typeof queries_referrals;
  seed: typeof seed;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
