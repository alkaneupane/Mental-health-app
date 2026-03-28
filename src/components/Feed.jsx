import { useState } from 'react';
import { Flag, Heart, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';

const TAGS = [
  { id: 'all',      label: 'All' },
  { id: 'lost',     label: 'Feeling lost' },
  { id: 'overwhelmed', label: 'Overwhelmed' },
  { id: 'family',   label: 'Family pressure' },
  { id: 'burnout',  label: 'Burned out' },
  { id: 'hope',     label: 'Need hope' },
  { id: 'lonely',   label: 'Lonely' },
  { id: 'marriage', label: 'Marriage Pressure' },
  { id: 'study_abroad', label: 'Studying Abroad' },
  { id: 'financial', label: 'Financial Stress' },
  { id: 'academic', label: 'Academic Pressure' },
  { id: 'loneliness', label: 'Loneliness' },
];

const TAG_COLORS = {
  lost:        { bg: '#EEEAF8', text: '#9B8EC4', border: '#C8BEE8' },
  overwhelmed: { bg: '#FDF0E8', text: '#C4856A', border: '#EAC4B3' },
  family:      { bg: '#EBF2EC', text: '#5C8C60', border: '#A8C5AC' },
  burnout:     { bg: '#FEF3E8', text: '#E8A87C', border: '#F0D0A8' },
  hope:        { bg: '#E8F4F8', text: '#5B8FA8', border: '#A8D0E0' },
  lonely:      { bg: '#F2EBF2', text: '#A87CA8', border: '#D0A8D0' },
  marriage:    { bg: '#F8EBEE', text: '#A86B78', border: '#E8C4CC' },
  study_abroad:{ bg: '#E8EEF8', text: '#5B6FA8', border: '#B8C4E8' },
  financial:   { bg: '#F5F0E8', text: '#8B7355', border: '#D8C8A8' },
  academic:    { bg: '#ECEAF8', text: '#6B5BA8', border: '#C4BEE8' },
  loneliness:  { bg: '#EDE8F2', text: '#7A6B8C', border: '#C8BED8' },
};

const SEED_POSTS = [
  {
    id: 1, tag: 'family', time: '12 min ago', relates: 14,
    text: "I haven't been able to tell my parents what I'm going through. In our culture you just don't talk about these things. It's like there's no space to even feel sad without someone saying \"just be grateful\".",
    replies: [
      { id: 1, text: "The 'just be grateful' thing hits so hard. You're allowed to feel both grateful and sad at the same time." },
      { id: 2, name: 'Verified supporter', text: "What you're feeling is valid. This space exists exactly for moments like this." },
    ],
  },
  {
    id: 2, tag: 'burnout', time: '1 hr ago', relates: 31,
    text: "Finished my exams but I feel nothing. Everyone around me is celebrating and I'm just... empty. I don't know if something is wrong with me.",
    replies: [],
  },
  {
    id: 3, tag: 'overwhelmed', time: '2 hr ago', relates: 22,
    text: "I've been telling myself 'just get through this week' for three months straight. I don't know when the week I can actually breathe is coming.",
    replies: [
      { id: 1, text: "Three months of 'just one more week' is exhausting. Your body and mind are trying to tell you something." },
    ],
  },
  {
    id: 4, tag: 'hope', time: '4 hr ago', relates: 89,
    text: "Six months ago I posted here when I was at my lowest. Today I had a real conversation with my sister about how I was feeling. Small thing. Felt huge. Thank you, SafeCircle.",
    replies: [
      { id: 1, text: "This is why this place exists. Thank you for coming back to share it. 💚" },
      { id: 2, text: "This made me tear up. So happy for you." },
    ],
  },
  {
    id: 5, tag: 'study_abroad', time: '5 hr ago', relates: 17,
    text: "First in my family to study abroad. Everyone is proud. Nobody asks if I'm okay. I smile on video calls so they don't worry. I don't know how to tell them I'm not okay.",
    replies: [],
  },
];

function TagPill({ tag, small }) {
  const c = TAG_COLORS[tag] || { bg: '#F0F0F0', text: '#8A8A8A', border: '#D0D0D0' };
  const label = TAGS.find(t => t.id === tag)?.label || tag;
  return (
    <span style={{
      fontSize: small ? 10 : 11, fontWeight: 500,
      padding: small ? '2px 8px' : '3px 10px',
      borderRadius: 50,
      background: c.bg, color: c.text,
      border: `1px solid ${c.border}`,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

function PostCard({ post }) {
  const [relates, setRelates] = useState(post.relates);
  const [related, setRelated] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [localReplies, setLocalReplies] = useState(post.replies);
  const [reported, setReported] = useState(false);

  const handleReply = () => {
    if (!replyText.trim()) return;
    setLocalReplies(r => [...r, { id: Date.now(), text: replyText }]);
    setReplyText('');
  };

  return (
    <article style={{
      padding: '20px 24px',
      borderBottom: '1px solid var(--warm-mid)',
      animation: 'fadeUp 0.35s ease',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'var(--warm-mid)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 10, fontWeight: 700, color: 'var(--ink-soft)',
            letterSpacing: '0.02em',
          }}>
            AN
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink)' }}>anonymous</span>
            <span style={{ fontSize: 12, color: 'var(--ink-soft)', marginLeft: 6 }}>· {post.time}</span>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <TagPill tag={post.tag} />
          <button onClick={() => setReported(true)} style={{
            background: 'none', padding: 4,
            color: reported ? 'var(--clay)' : 'var(--ink-soft)',
            opacity: 0.5, transition: 'color 0.2s, opacity 0.2s',
          }}>
            <Flag size={12} />
          </button>
        </div>
      </div>

      {/* Text */}
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--ink)', marginBottom: 14 }}>
        {post.text}
      </p>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button onClick={() => { if (!related) { setRelated(true); setRelates(r => r + 1); } }} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', fontSize: 12,
          color: related ? 'var(--sage)' : 'var(--ink-soft)',
          fontWeight: related ? 500 : 400,
          transition: 'color 0.2s',
        }}>
          <div style={{
            width: 7, height: 7, borderRadius: '50%',
            background: related ? 'var(--sage)' : 'var(--warm-dark)',
            transition: 'background 0.2s',
          }} />
          {relates} {relates === 1 ? 'person relates' : 'people relate'}
        </button>
        <button onClick={() => setShowReplies(v => !v)} style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', fontSize: 12, color: 'var(--ink-soft)',
        }}>
          <MessageCircle size={13} />
          Reply
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', fontSize: 12, color: 'var(--ink-soft)',
        }}>
          <Heart size={13} />
          Share experience
        </button>
      </div>

      {/* Replies */}
      {showReplies && (
        <div style={{ marginTop: 16 }}>
          {localReplies.map(r => (
            <div key={r.id} style={{
              padding: '10px 14px', marginBottom: 8,
              background: 'var(--warm)', borderRadius: 'var(--radius-md)',
              fontSize: 13, color: 'var(--ink-mid)',
              borderLeft: '2px solid var(--sage-light)',
              animation: 'fadeUp 0.3s ease',
            }}>
              {r.name && (
                <span style={{ fontSize: 11, color: 'var(--sage)', fontWeight: 600, display: 'block', marginBottom: 3 }}>
                  {r.name}
                </span>
              )}
              {r.text}
            </div>
          ))}
          <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
            <input
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleReply()}
              placeholder="Reply anonymously…"
              style={{
                flex: 1, padding: '9px 14px',
                background: 'var(--warm)',
                border: '1px solid var(--warm-mid)',
                borderRadius: 50, fontSize: 13, color: 'var(--ink)',
              }}
            />
            <button onClick={handleReply} style={{
              padding: '9px 18px', borderRadius: 50,
              background: replyText.trim() ? 'var(--sage)' : 'var(--warm-mid)',
              color: 'white', fontSize: 13, fontWeight: 500,
              transition: 'background 0.2s',
            }}>
              Send
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Feed({ reachCount, setReachCount }) {
  const [activeTag, setActiveTag] = useState('all');
  const [posts, setPosts] = useState(SEED_POSTS);
  const [composing, setComposing] = useState(false);
  const [newText, setNewText] = useState('');
  const [newTag, setNewTag] = useState('overwhelmed');
  const [reachBanner, setReachBanner] = useState(true);

  const filtered = activeTag === 'all' ? posts : posts.filter(p => p.tag === activeTag);

  const handlePost = () => {
    if (!newText.trim()) return;
    setPosts(p => [{ id: Date.now(), tag: newTag, time: 'just now', relates: 0, text: newText, replies: [] }, ...p]);
    setNewText(''); setComposing(false);
  };

  return (
    <div>
      {/* Top bar */}
      <div style={{
        padding: '20px 24px 0',
        borderBottom: '1px solid var(--warm-mid)',
        position: 'sticky', top: 0,
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <h2 style={{ fontSize: 22, color: 'var(--ink)', marginBottom: 2 }}>Community feed</h2>
            <p style={{ fontSize: 12, color: 'var(--ink-soft)' }}>anonymous • safe • real</p>
          </div>
          <button
            onClick={() => setComposing(v => !v)}
            style={{
              padding: '9px 20px', borderRadius: 50,
              background: 'var(--sage)', color: 'white',
              fontSize: 13, fontWeight: 500,
              boxShadow: '0 2px 12px rgba(92,140,96,0.3)',
              transition: 'opacity 0.2s',
            }}
          >
            + Post
          </button>
        </div>

        {/* Tag filters */}
        <div style={{
          display: 'flex', gap: 7, overflowX: 'auto', paddingBottom: 14,
          scrollbarWidth: 'none',
        }}>
          {TAGS.map(t => (
            <button key={t.id} onClick={() => setActiveTag(t.id)} style={{
              padding: '6px 14px', borderRadius: 50, whiteSpace: 'nowrap',
              fontSize: 12, fontWeight: activeTag === t.id ? 500 : 400,
              background: activeTag === t.id ? 'var(--sage)' : 'var(--warm)',
              color: activeTag === t.id ? 'white' : 'var(--ink-mid)',
              border: `1px solid ${activeTag === t.id ? 'transparent' : 'var(--warm-mid)'}`,
              transition: 'var(--transition)',
              flexShrink: 0,
            }}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Compose */}
      {composing && (
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--warm-mid)',
          background: 'var(--sage-pale)',
          animation: 'fadeUp 0.3s ease',
        }}>
          <p style={{ fontSize: 11, color: 'var(--ink-soft)', marginBottom: 10, fontStyle: 'italic' }}>
            You're posting anonymously. No name, no judgment.
          </p>
          <textarea
            autoFocus
            value={newText}
            onChange={e => setNewText(e.target.value)}
            placeholder="Share how you're feeling anonymously…"
            rows={3}
            style={{
              width: '100%', padding: '12px 14px',
              background: 'white',
              border: '1px solid var(--sage-mid)',
              borderRadius: 'var(--radius-md)',
              fontSize: 14, color: 'var(--ink)',
              resize: 'none', lineHeight: 1.6,
            }}
          />
          <div style={{ display: 'flex', gap: 10, marginTop: 10, alignItems: 'center' }}>
            <select
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              style={{
                padding: '7px 12px', borderRadius: 50,
                border: '1px solid var(--warm-mid)',
                background: 'white', fontSize: 12, color: 'var(--ink-mid)',
              }}
            >
              {TAGS.filter(t => t.id !== 'all').map(t => (
                <option key={t.id} value={t.id}>{t.label}</option>
              ))}
            </select>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <button onClick={() => setComposing(false)} style={{
                padding: '8px 16px', borderRadius: 50, background: 'white',
                border: '1px solid var(--warm-mid)', fontSize: 12, color: 'var(--ink-soft)',
              }}>
                Cancel
              </button>
              <button onClick={handlePost} style={{
                padding: '8px 20px', borderRadius: 50,
                background: newText.trim() ? 'var(--sage)' : 'var(--warm-mid)',
                color: 'white', fontSize: 12, fontWeight: 500, transition: 'background 0.2s',
              }}>
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reach banner */}
      {reachBanner && (
        <div style={{
          margin: '16px 24px',
          padding: '14px 16px',
          background: 'var(--sage-pale)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--sage-mid)',
          display: 'flex', alignItems: 'center', gap: 12,
          animation: 'fadeUp 0.4s ease',
        }}>
          <div style={{
            width: 10, height: 10, borderRadius: '50%',
            background: 'var(--sage)', flexShrink: 0,
            animation: 'breathe 2s ease-in-out infinite',
          }} />
          <p style={{ fontSize: 13, color: 'var(--ink-mid)', flex: 1, lineHeight: 1.5 }}>
            Someone in your community just reached out. They need support right now.
          </p>
          <button style={{
            padding: '6px 14px', borderRadius: 50,
            background: 'var(--sage)', color: 'white',
            fontSize: 12, fontWeight: 500, flexShrink: 0,
          }}>
            Respond
          </button>
        </div>
      )}

      {/* Posts */}
      <div>
        {filtered.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
        {filtered.length === 0 && (
          <div style={{ padding: '48px 24px', textAlign: 'center', color: 'var(--ink-soft)' }}>
            <p style={{ fontSize: 15, marginBottom: 6 }}>No posts with this feeling yet.</p>
            <p style={{ fontSize: 13 }}>Be the first to share.</p>
          </div>
        )}
      </div>
    </div>
  );
}
