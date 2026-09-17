import { ConvexError, v } from "convex/values"
import { mutation, query } from "../_generated/server"

/**
 * Creates a new conversation for a contact session within an organization.
 * 
 * Flow:
 * 1. Validates that the provided `contactSessionId` exists and has not expired.
 * 2. Initializes a conversation record in the database with "unresolved" status.
 * 3. Returns the newly created `conversationId`.
 */
export const create = mutation({
  args: {
    organizationId: v.string(),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    // Verify that the contact session is valid and active before starting a conversation
    const session = await ctx.db.get(args.contactSessionId)
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      })
    }

    // TODO: Replace once functionality for thread creation is developed
    const threadId = "123"

    // Persist conversation tied to the session and organization
    const conversationId = await ctx.db.insert("conversations", {
      threadId,
      organizationId: args.organizationId,
      contactSessionId: session._id,
      status: "unresolved",
    })
    return conversationId
  },
})

/**
 * Fetches an existing conversation after verifying session authorization.
 * 
 * Flow:
 * 1. Checks that the requesting contact session is valid and not expired.
 * 2. Retrieves the conversation document by `conversationId`.
 * 3. Returns the conversation details (`_id`, `status`, `threadId`) or `null` if not found.
 */
export const getOne = query({
  args: {
    conversationId: v.id("conversations"),
    contactSessionId: v.id("contactSession"),
  },
  handler: async (ctx, args) => {
    // Ensure caller has an active, valid contact session
    const session = await ctx.db.get(args.contactSessionId)
    if (!session || session.expiresAt < Date.now()) {
      throw new ConvexError({
        code: "UNAUTHORIZED",
        message: "Invalid session",
      })
    }

    const conversation = await ctx.db.get(args.conversationId)
    if (!conversation) {
      return null
    }

    return {
      _id: conversation._id,
      status: conversation.status,
      threadId: conversation.threadId,
    }
  },
})
