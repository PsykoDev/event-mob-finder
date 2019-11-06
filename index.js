module.exports = function EventMobFinder(mod) {
  let npcs = []

  mod.hook('S_SPAWN_NPC', 11, event => {
    if (event.bySpawnEvent) {
      const id = event.gameId * 2n
      event.loc.z -= 100
      npcs.push(id)
      mod.send('S_SPAWN_DROPITEM', 8, {
        gameId: id,
        loc: event.loc,
        item: 88716,
        amount: 1
      })
      mod.send('S_DUNGEON_EVENT_MESSAGE', 2, { type: 2, message: 'Found event mob.' })
    }
  })

  mod.hook('S_DESPAWN_NPC', 3, event => {
    const id = event.gameId * 2n
    if (npcs.includes(id)) {
      mod.send('S_DESPAWN_DROPITEM', 4, { gameId: id })
      npcs = npcs.filter(npc => npc !== id)
    }
  })
}