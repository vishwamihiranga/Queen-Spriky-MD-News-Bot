const { cmd } = require('../command'),
  Hiru = require('hirunews-scrap'),
  Esana = require('@sl-code-lords/esana-news')
let activeGroups = {},
  lastNewsTitles = {}
async function getLatestNews() {
  let _0x2f8761 = []
  try {
    const _0x3a52f8 = new Hiru(),
      _0x300039 = await _0x3a52f8.BreakingNews()
    _0x2f8761.push({
      title: _0x300039.results.title,
      content: _0x300039.results.news,
      date: _0x300039.results.date,
    })
  } catch (_0x2201a0) {
    console.error('Error fetching Hiru News: ' + _0x2201a0.message)
  }
  try {
    const _0x2562f1 = new Esana(),
      _0x5bb384 = await _0x2562f1.getLatestNews()
    _0x5bb384 &&
    _0x5bb384.title &&
    _0x5bb384.description &&
    _0x5bb384.publishedAt
      ? _0x2f8761.push({
          title: _0x5bb384.title,
          content: _0x5bb384.description,
          date: _0x5bb384.publishedAt,
        })
      : console.error('Error: Esana News returned invalid data.')
  } catch (_0x15f353) {
    console.error('Error fetching Esana News: ' + _0x15f353.message)
  }
  return _0x2f8761
}
async function checkAndPostNews(_0x20708b, _0x15f268) {
  const _0x767b66 = await getLatestNews()
  _0x767b66.forEach(async (_0x58eaf3) => {
    !lastNewsTitles[_0x15f268] && (lastNewsTitles[_0x15f268] = [])
    !lastNewsTitles[_0x15f268].includes(_0x58eaf3.title) &&
      (await _0x20708b.sendMessage(_0x15f268, {
        text:
          '\uD83D\uDCF0 *' +
          _0x58eaf3.title +
          '*\n' +
          _0x58eaf3.content +
          '\n' +
          _0x58eaf3.date +
          '\n*Queen Spriky MD News*',
      }),
      lastNewsTitles[_0x15f268].push(_0x58eaf3.title),
      lastNewsTitles[_0x15f268].length > 100 &&
        lastNewsTitles[_0x15f268].shift())
  })
}
async function getHiruNews() {
  try {
    const _0x4bb57b = new Hiru(),
      _0x4aaa06 = await _0x4bb57b.BreakingNews()
    return {
      title: _0x4aaa06.results.title,
      content: _0x4aaa06.results.news,
      date: _0x4aaa06.results.date,
    }
  } catch (_0x2f38e0) {
    return console.error('Error fetching Hiru News: ' + _0x2f38e0.message), null
  }
}
cmd(
  {
    pattern: 'hirunews',
    desc: 'Fetch the latest news from Hiru',
    react: '\uD83D\uDCF0',
    category: 'news',
    filename: __filename,
  },
  async (_0x4d3546, _0x2498ca, _0x29f1d5, { from: _0x3eb754 }) => {
    const _0x4348ab = await getHiruNews()
    _0x4348ab
      ? await _0x4d3546.sendMessage(_0x3eb754, {
          text:
            '\uD83D\uDCF0 *' +
            _0x4348ab.title +
            '*\n' +
            _0x4348ab.content +
            '\n' +
            _0x4348ab.date +
            ' \n\n*Dev : Vishwa Mihiranga*',
        })
      : await _0x4d3546.sendMessage(_0x3eb754, {
          text: 'Failed to fetch Hiru News.',
        })
  }
)
cmd(
  {
    pattern: 'news',
    desc: 'Enable Sri Lankan news updates in this group',
    isGroup: true,
    react: '\uD83D\uDCF0',
    filename: __filename,
  },
  async (
    _0x3e4516,
    _0x4b745e,
    _0x10382d,
    { from: _0x4106a2, isGroup: _0x3646b1, participants: _0x273c1f }
  ) => {
    try {
      if (_0x3646b1) {
        const _0x6236db = _0x273c1f.some(
            (_0x1e4554) => _0x1e4554.id === _0x4b745e.sender && _0x1e4554.admin
          ),
          _0x3e066c = _0x4b745e.sender === _0x3e4516.user.jid
        _0x6236db || _0x3e066c
          ? !activeGroups[_0x4106a2]
            ? ((activeGroups[_0x4106a2] = true),
              await _0x3e4516.sendMessage(_0x4106a2, {
                text: '\uD83D\uDCF0 24/7 News Activated.',
              }),
              !activeGroups.interval &&
                (activeGroups.interval = setInterval(async () => {
                  for (const _0x595ef7 in activeGroups) {
                    activeGroups[_0x595ef7] &&
                      _0x595ef7 !== 'interval' &&
                      (await checkAndPostNews(_0x3e4516, _0x595ef7))
                  }
                }, 60000)))
            : await _0x3e4516.sendMessage(_0x4106a2, {
                text: '\uD83D\uDCF0 24/7 News Already Activated.',
              })
          : await _0x3e4516.sendMessage(_0x4106a2, {
              text: '\uD83D\uDEAB This command can only be used by group admins or the bot owner.',
            })
      } else {
        await _0x3e4516.sendMessage(_0x4106a2, {
          text: 'This command can only be used in groups.',
        })
      }
    } catch (_0x922203) {
      console.error('Error in sprikynews command: ' + _0x922203.message)
      await _0x3e4516.sendMessage(_0x4106a2, {
        text: 'Failed to activate the news service.',
      })
    }
  }
)
cmd(
  {
    pattern: 'stopnews',
    desc: 'Disable Sri Lankan news updates in this group',
    isGroup: true,
    react: '\uD83D\uDED1',
    filename: __filename,
  },
  async (
    _0x326842,
    _0x16fd9a,
    _0x45ce2c,
    { from: _0x4d66a8, isGroup: _0x201b3d, participants: _0x5b8f17 }
  ) => {
    try {
      if (_0x201b3d) {
        const _0x46f891 = _0x5b8f17.some(
            (_0x21531b) => _0x21531b.id === _0x16fd9a.sender && _0x21531b.admin
          ),
          _0x6c2dad = _0x16fd9a.sender === _0x326842.user.jid
        _0x46f891 || _0x6c2dad
          ? activeGroups[_0x4d66a8]
            ? (delete activeGroups[_0x4d66a8],
              await _0x326842.sendMessage(_0x4d66a8, {
                text: '\uD83D\uDED1 24/7 News Deactivated.',
              }),
              Object.keys(activeGroups).length === 1 &&
                activeGroups.interval &&
                (clearInterval(activeGroups.interval),
                delete activeGroups.interval))
            : await _0x326842.sendMessage(_0x4d66a8, {
                text: '\uD83D\uDED1 24/7 News is not active in this group.',
              })
          : await _0x326842.sendMessage(_0x4d66a8, {
              text: '\uD83D\uDEAB This command can only be used by group admins or the bot owner.',
            })
      } else {
        await _0x326842.sendMessage(_0x4d66a8, {
          text: 'This command can only be used in groups.',
        })
      }
    } catch (_0x3abf96) {
      console.error('Error in stopsprikynews command: ' + _0x3abf96.message)
      await _0x326842.sendMessage(_0x4d66a8, {
        text: 'Failed to deactivate the news service.',
      })
    }
  }
)
cmd(
  {
    pattern: 'checknews',
    desc: 'Check if the Sri Lankan news service is active in this group',
    isGroup: true,
    react: '\uD83D\uDD0D',
    filename: __filename,
  },
  async (_0x1e33f4, _0x43a736, _0x4ea8f9, { from: _0x5667e1 }) => {
    activeGroups[_0x5667e1]
      ? await _0x1e33f4.sendMessage(_0x5667e1, {
          text: '\uD83D\uDCF0 The 24/7 news service is currently active in this group.',
        })
      : await _0x1e33f4.sendMessage(_0x5667e1, {
          text: '\uD83D\uDED1 The 24/7 news service is not active in this group.',
        })
  }
)
