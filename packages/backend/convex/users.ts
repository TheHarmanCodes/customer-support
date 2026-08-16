import { mutation, query } from "./_generated/server"
export const getMany = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect()

    return users
  },
})

export const add = mutation({
  args: {},
  handler: async (ctx) => {
    //server side route protection)
    const identity = await ctx.auth.getUserIdentity()
    if (identity === null) {
      throw new Error("Not authenticated")
    }

    const organization = identity.o as { id?: string } | undefined
    const orgId = (identity.org_id ?? organization?.id) as string | undefined
    if (!orgId) {
      throw new Error("Missing Organization")
    }

    const userId = await ctx.db.insert("users", {
      name: "jane",
    })
    return userId
  },
})
