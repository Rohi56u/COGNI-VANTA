import React, { useEffect, useMemo, useState } from 'react';
import { Brain, CheckCircle2, Clock3, Flame, Pause, Play, RotateCcw, Target, Zap } from 'lucide-react';

const FOCUS_SECONDS = 25 * 60;
const STORAGE_KEY = 'cognivanta_focus_session';

const MISSIONS = {
  upload: { label: 'Decode one note', detail: 'Upload a page and turn it into a concept map.', icon: Brain },
  profile: { label: 'Review your trail', detail: 'Check your streak and pick one weak area to revisit.', icon: Target },
  biology: { label: 'Explore a living system', detail: 'Complete one biology recall challenge.', icon: Flame },
  physics: { label: 'Solve a force problem', detail: 'Visit a physics realm and test one concept.', icon: Zap },
  history: { label: 'Walk through an era', detail: 'Enter a timeline realm and connect cause to effect.', icon: Clock3 },
  geography: { label: 'Map a new place', detail: 'Explore a region and lock in three facts.', icon: Target }
};

function readFocus() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return { seconds: saved?.seconds > 0 ? saved.seconds : FOCUS_SECONDS, running: false, sessions: saved?.sessions || 0 };
  } catch {
    return { seconds: FOCUS_SECONDS, running: false, sessions: 0 };
  }
}

export default function StudyPulse({ activeSpace, stats, onNavigateSpace, onAwardXP }) {
  const [focus, setFocus] = useState(readFocus);
  const mission = MISSIONS[activeSpace] || MISSIONS.upload;
  const MissionIcon = mission.icon;
  const minutes = Math.floor(focus.seconds / 60).toString().padStart(2, '0');
  const seconds = (focus.seconds % 60).toString().padStart(2, '0');
  const progress = ((FOCUS_SECONDS - focus.seconds) / FOCUS_SECONDS) * 100;
  const level = stats?.level || 1;
  const streakHint = Math.max(1, Math.min(7, Math.floor((stats?.xp || 0) / 100) + 1));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ seconds: focus.seconds, sessions: focus.sessions }));
  }, [focus.seconds, focus.sessions]);

  useEffect(() => {
    if (!focus.running) return undefined;
    const timer = window.setInterval(() => {
      setFocus((current) => {
        if (current.seconds <= 1) {
          window.clearInterval(timer);
          onAwardXP?.(40, 'Focus Sprint complete', `focus_sprint_${current.sessions + 1}`);
          return { seconds: FOCUS_SECONDS, running: false, sessions: current.sessions + 1 };
        }
        return { ...current, seconds: current.seconds - 1 };
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [focus.running, onAwardXP]);

  const status = useMemo(() => {
    if (focus.running) return 'IN FOCUS';
    if (focus.seconds < FOCUS_SECONDS) return 'PAUSED';
    return 'READY';
  }, [focus.running, focus.seconds]);

  const reset = () => setFocus((current) => ({ ...current, seconds: FOCUS_SECONDS, running: false }));

  return (
    <section className="study-pulse" aria-label="Cognivanta study pulse">
      <div className="study-pulse-mission">
        <div className="study-pulse-icon"><MissionIcon /></div>
        <div className="study-pulse-copy">
          <span className="study-pulse-kicker">TODAY'S MISSION · LEVEL {level}</span>
          <strong>{mission.label}</strong>
          <small>{mission.detail}</small>
        </div>
        {activeSpace !== 'upload' && (
          <button className="study-pulse-link" onClick={() => onNavigateSpace?.('upload')}>CAPTURE NOTES</button>
        )}
      </div>
      <div className="study-pulse-sprint">
        <div className="study-pulse-timer-head">
          <span><Clock3 /> FOCUS SPRINT</span>
          <em>{status}</em>
        </div>
        <div className="study-pulse-timer-row">
          <strong>{minutes}:{seconds}</strong>
          <div className="study-pulse-actions">
            <button onClick={() => setFocus((current) => ({ ...current, running: !current.running }))} aria-label={focus.running ? 'Pause focus sprint' : 'Start focus sprint'}>
              {focus.running ? <Pause /> : <Play />}
            </button>
            <button onClick={reset} aria-label="Reset focus sprint"><RotateCcw /></button>
          </div>
        </div>
        <div className="study-pulse-track"><span style={{ width: `${Math.max(0, progress)}%` }} /></div>
        <small><CheckCircle2 /> {focus.sessions} completed · {streakHint}-day momentum target</small>
      </div>
    </section>
  );
}
