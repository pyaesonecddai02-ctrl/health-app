import React from 'react';
import { WaterCard } from './cards/WaterCard';
import { StepsCard } from './cards/StepsCard';
import { WeightCard } from './cards/WeightCard';
import { BloodPressureCard } from './cards/BloodPressureCard';
import { DietCard } from './cards/DietCard';
import { SleepCard } from './cards/SleepCard';
import { FastingCard } from './cards/FastingCard';
import { MoodWellnessCard } from './cards/MoodWellnessCard';
import { WorkoutCard } from './cards/WorkoutCard';
import { MedicationCard } from './cards/MedicationCard';
import { Target, Sparkles } from 'lucide-react';
import { getTranslation } from '../utils/translations';

export function DailyLog({
  dailyState,
  setDailyState,
  profile,
  yesterdayData,
  onOpenDetail,
  lang = 'en',
}) {
  const {
    waterGlasses,
    steps,
    weight,
    bloodPressure,
    meals,
    unit,
    sleepData = { hours: 7.5, qualityScore: 88, bedtime: '23:00', wakeTime: '07:00' },
    fastingData = { targetHours: 16, isActive: true, startTime: Date.now() - 14 * 3600 * 1000 },
    moodData = { currentMood: 'calm', stressLevel: 3, notes: 'Feeling refreshed and mindful today.' },
    workouts = [
      { id: 'w1', name: 'Morning HIIT Cardio', activity: 'HIIT', duration: 20, calories: 240, time: '07:15 AM' },
    ],
    medications = [
      { id: 'med1', name: 'Vitamin D3', dosage: '2000 IU', timeOfDay: 'Morning', taken: true },
      { id: 'med2', name: 'Omega-3 EPA/DHA', dosage: '1000 mg', timeOfDay: 'Lunch', taken: true },
      { id: 'med3', name: 'Magnesium Glycinate', dosage: '400 mg', timeOfDay: 'Evening', taken: false },
    ],
  } = dailyState;

  // Helpers to update individual slices of state
  const setWaterGlasses = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      waterGlasses: typeof valOrFn === 'function' ? valOrFn(prev.waterGlasses) : valOrFn,
    }));
  };

  const setSteps = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      steps: typeof valOrFn === 'function' ? valOrFn(prev.steps) : valOrFn,
    }));
  };

  const setWeight = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      weight: typeof valOrFn === 'function' ? valOrFn(prev.weight) : valOrFn,
    }));
  };

  const setUnit = (newUnit) => {
    setDailyState((prev) => ({
      ...prev,
      unit: newUnit,
    }));
  };

  const setBloodPressure = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      bloodPressure: typeof valOrFn === 'function' ? valOrFn(prev.bloodPressure) : valOrFn,
    }));
  };

  const setMeals = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      meals: typeof valOrFn === 'function' ? valOrFn(prev.meals) : valOrFn,
    }));
  };

  const setSleepData = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      sleepData: typeof valOrFn === 'function' ? valOrFn(prev.sleepData || sleepData) : valOrFn,
    }));
  };

  const setFastingData = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      fastingData: typeof valOrFn === 'function' ? valOrFn(prev.fastingData || fastingData) : valOrFn,
    }));
  };

  const setMoodData = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      moodData: typeof valOrFn === 'function' ? valOrFn(prev.moodData || moodData) : valOrFn,
    }));
  };

  const setWorkouts = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      workouts: typeof valOrFn === 'function' ? valOrFn(prev.workouts || workouts) : valOrFn,
    }));
  };

  const setMedications = (valOrFn) => {
    setDailyState((prev) => ({
      ...prev,
      medications: typeof valOrFn === 'function' ? valOrFn(prev.medications || medications) : valOrFn,
    }));
  };

  // Completion calculation for header summary badge
  const waterDone = waterGlasses >= (profile.dailyWaterGoal || 8);
  const stepsDone = steps >= (profile.dailyStepsGoal || 10000);
  const sleepDone = (sleepData?.hours || 0) >= (profile.dailySleepGoal || 8);
  const goalsReachedCount = [waterDone, stepsDone, sleepDone].filter(Boolean).length;

  return (
    <section className="space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Sparkles className="w-4 h-4" />
            </span>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {getTranslation('dailyHealthLogs', lang)}
            </h2>
          </div>
          <p className="text-sm text-white/60 mt-0.5">
            {getTranslation('dailyLogSubtitle', lang)}
          </p>
        </div>

        {/* Quick status pill */}
        <div className="flex items-center gap-2">
          <div className="glass-card px-3.5 py-1.5 flex items-center gap-2 text-xs text-white/90">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>
              {getTranslation('todayKeyTargets', lang)}: <strong className="text-emerald-300">{goalsReachedCount}/3</strong> {getTranslation('completed', lang)}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Interactive Glassmorphism Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Water Intake */}
        <WaterCard
          waterGlasses={waterGlasses}
          setWaterGlasses={setWaterGlasses}
          goal={profile.dailyWaterGoal || 8}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 2: Steps Tracker */}
        <StepsCard
          steps={steps}
          setSteps={setSteps}
          goal={profile.dailyStepsGoal || 10000}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 3: Weight Tracking */}
        <WeightCard
          weight={weight}
          setWeight={setWeight}
          yesterdayWeight={yesterdayData.weight}
          unit={unit || 'kg'}
          setUnit={setUnit}
          userHeight={profile.height || 168}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 4: Blood Pressure */}
        <BloodPressureCard
          bloodPressure={bloodPressure}
          setBloodPressure={setBloodPressure}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 5: Workout & Fitness */}
        <WorkoutCard
          workouts={workouts}
          setWorkouts={setWorkouts}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 6: Medication & Supplements */}
        <MedicationCard
          medications={medications}
          setMedications={setMedications}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 7: Sleep & Rest */}
        <SleepCard
          sleepData={sleepData}
          setSleepData={setSleepData}
          goal={profile.dailySleepGoal || 8.0}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 8: 16:8 Fasting Timer */}
        <FastingCard
          fastingData={fastingData}
          setFastingData={setFastingData}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 9: Mind & Mood Wellness */}
        <MoodWellnessCard
          moodData={moodData}
          setMoodData={setMoodData}
          onOpenDetail={onOpenDetail}
        />

        {/* Card 10: Diet & Calories (Spans full width/3 cols on lg screens for comfortable layout) */}
        <div className="md:col-span-2 lg:col-span-3">
          <DietCard
            meals={meals}
            setMeals={setMeals}
            targetCalories={profile.dailyCaloriesGoal || 2000}
            onOpenDetail={onOpenDetail}
          />
        </div>
      </div>
    </section>
  );
}
