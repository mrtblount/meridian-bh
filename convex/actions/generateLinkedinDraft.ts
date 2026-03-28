"use node";

import { action } from "../_generated/server";
import { internal } from "../_generated/api";
import { v } from "convex/values";
import {
  callClaude,
  LINKEDIN_SYSTEM_PROMPT,
  buildLinkedinUserPrompt,
} from "../../lib/claude";

export const generateLinkedinDraft = action({
  args: { topic: v.string() },
  handler: async (ctx, args) => {
    const userPrompt = buildLinkedinUserPrompt(args.topic);
    const content = await callClaude(LINKEDIN_SYSTEM_PROMPT, userPrompt);

    await ctx.runMutation(internal.mutations.linkedin.storeDraft, {
      topic: args.topic,
      content,
    });

    return content;
  },
});
