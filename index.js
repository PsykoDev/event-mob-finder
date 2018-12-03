module.exports = function EventMobFinder(mod) {
  let npcs = []

  mod.hook('S_SPAWN_NPC', 10, event => {
    if (event.bySpawnEvent) {
      const id = event.gameId.low
      npcs.push(id)
      mod.send('S_SPAWN_DROPITEM', 6, {
        gameId: { low: id, high: 0, unsigned: true },
        loc: event.loc,
        item: 98260,
        amount: 1
      })
      mod.send('S_DUNGEON_EVENT_MESSAGE', 2, {
        type: 2,
        chat: false,
        channel: 0,
        message: 'Found event mob.'
      })
    }
  })

  mod.hook('S_DESPAWN_NPC', 3, event => {
    const id = event.gameId.low
    if (npcs.includes(id)) {
      mod.send('S_DESPAWN_DROPITEM', 4, {
        gameId: { low: id, high: 0, unsigned: true }
      })
      npcs = npcs.filter(npc => npc !== id)
    }
  })
}