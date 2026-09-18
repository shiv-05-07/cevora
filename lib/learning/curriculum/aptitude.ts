import { SubjectCurriculum } from './types';

export const aptitudeCurriculum: SubjectCurriculum = {
  key: 'aptitude',
  label: 'Aptitude',
  roadmapTitle: 'Aptitude & Quantitative Reasoning Track',
  roadmapDescription: 'Master quantitative math, logical reasoning, speed calculations, data interpretation, and placement online assessment (OA) problem solving.',
  roadmapSteps: [
    { id: 'apt-1', topicKey: 'percentages-ratios', title: 'Percentages & Ratios', description: 'Percentage shifts, ratio division, proportions, and fast mental calculations.', order: 1, estimatedMinutes: 45 },
    { id: 'apt-2', topicKey: 'averages', title: 'Averages & Number Systems', description: 'Weighted averages, divisibility rules, remainders, and prime factors.', order: 2, estimatedMinutes: 45 },
    { id: 'apt-3', topicKey: 'profit-loss', title: 'Profit & Loss', description: 'Cost price, selling price, margin percentages, and progressive discounts.', order: 3, estimatedMinutes: 45 },
    { id: 'apt-4', topicKey: 'time-work', title: 'Time & Work', description: 'Work rates, combined efficiency, pipes & cisterns, and capacity filling.', order: 4, estimatedMinutes: 45 },
    { id: 'apt-5', topicKey: 'time-speed-distance', title: 'Time, Speed & Distance', description: 'Relative speed, train crossings, boat stream vectors, and average speed.', order: 5, estimatedMinutes: 60 },
    { id: 'apt-6', topicKey: 'probability', title: 'Probability', description: 'Sample spaces, independent events, conditional probability, and Bayes rule.', order: 6, estimatedMinutes: 60 },
    { id: 'apt-7', topicKey: 'permutations-combinations', title: 'Permutations & Combinations', description: 'Factorial arrangements, selection combinations, and circular permutations.', order: 7, estimatedMinutes: 60 },
    { id: 'apt-8', topicKey: 'logical-reasoning', title: 'Logical Reasoning & Data Interpretation', description: 'Number series, clock angles, seating arrangements, and chart interpretation.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building quantitative speed, problem-solving efficiency, and logical reasoning for OA screening rounds.",
    nextStep: "Complete today's Aptitude mission to master rapid quantitative calculations and logical reasoning."
  },
  diagnosticQuestions: [
    {
      id: 'apt_dq1',
      subjectKey: 'aptitude',
      conceptKey: 'percentages-ratios',
      concept: 'Percentage Net Change',
      difficulty: 'BEGINNER',
      question: 'If a product price is increased by 20% and subsequently decreased by 20%, what is the net percentage change in price?',
      options: [
        { id: 'A', text: '4% decrease' },
        { id: 'B', text: 'No change (0%)' },
        { id: 'C', text: '4% increase' },
        { id: 'D', text: '2% decrease' }
      ],
      correctAnswer: 'A',
      explanation: 'Let price = 100. After +20% = 120. Decreasing 120 by 20% (24) yields 96, representing a net 4% decrease.'
    },
    {
      id: 'apt_dq2',
      subjectKey: 'aptitude',
      conceptKey: 'percentages-ratios',
      concept: 'Ratios',
      difficulty: 'BEGINNER',
      question: 'If A and B share $500 in the ratio 3:2, how much money does A receive?',
      options: [
        { id: 'A', text: '$300' },
        { id: 'B', text: '$200' },
        { id: 'C', text: '$250' },
        { id: 'D', text: '$350' }
      ],
      correctAnswer: 'A',
      explanation: 'Total parts = 3 + 2 = 5. Value per part = $500 / 5 = $100. A receives 3 parts = $300.'
    },
    {
      id: 'apt_dq3',
      subjectKey: 'aptitude',
      conceptKey: 'time-work',
      concept: 'Time & Work',
      difficulty: 'INTERMEDIATE',
      question: 'Person A completes a job in 10 days; Person B completes the same job in 15 days. Working together, how many days will they take?',
      options: [
        { id: 'A', text: '6 days' },
        { id: 'B', text: '8 days' },
        { id: 'C', text: '12.5 days' },
        { id: 'D', text: '5 days' }
      ],
      correctAnswer: 'A',
      explanation: 'Combined rate = (1/10) + (1/15) = (3+2)/30 = 5/30 = 1/6 job/day. Total time = 6 days.'
    },
    {
      id: 'apt_dq4',
      subjectKey: 'aptitude',
      conceptKey: 'time-speed-distance',
      concept: 'Relative Speed',
      difficulty: 'INTERMEDIATE',
      question: 'A car travels 180 km in 3 hours. What is its average speed in meters per second (m/s)?',
      options: [
        { id: 'A', text: '16.67 m/s' },
        { id: 'B', text: '60 m/s' },
        { id: 'C', text: '20 m/s' },
        { id: 'D', text: '15 m/s' }
      ],
      correctAnswer: 'A',
      explanation: 'Speed = 180 km / 3 h = 60 km/h. Convert to m/s: 60 * (5/18) = 16.67 m/s.'
    },
    {
      id: 'apt_dq5',
      subjectKey: 'aptitude',
      conceptKey: 'probability',
      concept: 'Probability',
      difficulty: 'INTERMEDIATE',
      question: 'What is the probability of rolling a sum of 7 with two fair 6-sided dice?',
      options: [
        { id: 'A', text: '1/6' },
        { id: 'B', text: '1/12' },
        { id: 'C', text: '7/36' },
        { id: 'D', text: '5/36' }
      ],
      correctAnswer: 'A',
      explanation: 'Pairs giving sum 7: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) = 6 out of 36 outcomes = 1/6.'
    },
    {
      id: 'apt_dq6',
      subjectKey: 'aptitude',
      conceptKey: 'permutations-combinations',
      concept: 'Permutations',
      difficulty: 'INTERMEDIATE',
      question: 'How many distinct ways can the letters of the word "LEADER" be arranged?',
      options: [
        { id: 'A', text: '360' },
        { id: 'B', text: '720' },
        { id: 'C', text: '120' },
        { id: 'D', text: '480' }
      ],
      correctAnswer: 'A',
      explanation: 'Total letters = 6. \'E\' appears 2 times. Unique arrangements = 6! / 2! = 720 / 2 = 360.'
    },
    {
      id: 'apt_dq7',
      subjectKey: 'aptitude',
      conceptKey: 'logical-reasoning',
      concept: 'Clock Angles',
      difficulty: 'ADVANCED',
      question: 'What is the angle between the hour and minute hands of a clock at 3:30?',
      options: [
        { id: 'A', text: '75 degrees' },
        { id: 'B', text: '90 degrees' },
        { id: 'C', text: '105 degrees' },
        { id: 'D', text: '60 degrees' }
      ],
      correctAnswer: 'A',
      explanation: 'Minute hand angle = 30 * 6 = 180°. Hour hand angle = 3*30 + 30*0.5 = 105°. Difference = 180° - 105° = 75°.'
    },
    {
      id: 'apt_dq8',
      subjectKey: 'aptitude',
      conceptKey: 'averages',
      concept: 'Compound Interest',
      difficulty: 'ADVANCED',
      question: 'A principal of $1,000 compounded annually at 10% for 2 years yields what total compound interest?',
      options: [
        { id: 'A', text: '$210' },
        { id: 'B', text: '$200' },
        { id: 'C', text: '$220' },
        { id: 'D', text: '$250' }
      ],
      correctAnswer: 'A',
      explanation: 'Amount = 1000 * (1.10)^2 = $1,210. Interest = 1210 - 1000 = $210.'
    }
  ],
  missions: [
    {
      id: 'apt-m1',
      topicKey: 'percentages-ratios',
      title: 'Percentages & Ratios — Fast Calculation Techniques',
      description: 'Master fast percentage calculations, ratio division, and divisibility shortcuts.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Percentage and Ratio Calculation Techniques',
        content: 'Percentages compute fractional changes relative to base values. Ratios split quantities proportionally across component terms.',
        interactiveExample: {
          language: 'text',
          code: 'Net % change after +x% and -y% = x - y - (x*y)/100',
          explanation: 'Successive percentage changes follow standard algebraic expansion.'
        }
      },
      practice: {
        question: 'If a price rises 20% then drops 20%, what is the net change?',
        options: [
          { id: 'A', text: '4% decrease' },
          { id: 'B', text: 'No change' },
          { id: 'C', text: '4% increase' },
          { id: 'D', text: '2% decrease' }
        ],
        correctAnswerId: 'A',
        explanation: 'Net change = 20 - 20 - (400/100) = -4%.'
      },
      review: {
        title: 'Percentages & Ratios Review',
        pitfalls: ['Confusing the base value when calculating percentage increases vs decreases'],
        edgeCases: ['Multi-stage successive compounding discounts'],
        keyTakeaway: 'Always identify the explicit base value before applying percentage calculations.'
      },
      interview: {
        title: 'Technical Viva: Speed Math Strategies',
        question: 'How do you quickly compute 15% of 240 in your head?',
        hint: '10% plus 5% (half of 10%).',
        keyPoints: ['10% of 240 = 24', '5% of 240 = 12', 'Sum = 24 + 12 = 36']
      }
    },
    {
      id: 'apt-m2',
      topicKey: 'averages',
      title: 'Averages & Number Systems — Weighted Means & Properties',
      description: 'Master weighted averages, median statistics, and prime number properties.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Weighted Averages and Number Properties',
        content: 'Weighted average combines groups with different item counts: `(n1*avg1 + n2*avg2) / (n1 + n2)`.',
        interactiveExample: {
          language: 'text',
          code: 'Class A (20 students, avg 80) + Class B (30 students, avg 90)\nCombined Avg = (20*80 + 30*90) / 50 = (1600 + 2700) / 50 = 86',
          explanation: 'Weighted sum divides by total combined student count.'
        }
      },
      practice: {
        question: 'What is the average of the first 5 prime numbers (2, 3, 5, 7, 11)?',
        options: [
          { id: 'A', text: '5.6' },
          { id: 'B', text: '5.2' },
          { id: 'C', text: '6.0' },
          { id: 'D', text: '4.8' }
        ],
        correctAnswerId: 'A',
        explanation: 'Sum = 2 + 3 + 5 + 7 + 11 = 28. Average = 28 / 5 = 5.6.'
      },
      review: {
        title: 'Averages Review',
        pitfalls: ['Taking simple average of two group averages when group sizes differ'],
        edgeCases: ['Extreme values heavily pulling arithmetic means'],
        keyTakeaway: 'Use weighted averages whenever group sizes are unequal.'
      },
      interview: {
        title: 'Technical Viva: Arithmetic Mean vs Median',
        question: 'When is Median preferred over Mean in salary datasets?',
        hint: 'Skewed distributions with extreme high earners.',
        keyPoints: ['Mean is distorted by extreme outliers', 'Median accurately reflects 50th percentile midpoint']
      }
    },
    {
      id: 'apt-m3',
      topicKey: 'profit-loss',
      title: 'Ratios & Proportions',
      description: 'Master Profit, Loss, Cost Price, Selling Price, and progressive discounts.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Profit & Loss Metrics',
        content: 'Profit = Selling Price - Cost Price. Margin percentage is always calculated relative to Cost Price unless specified otherwise.',
        interactiveExample: {
          language: 'text',
          code: 'Cost Price = $80, Selling Price = $100\nProfit % = ((100 - 80) / 80) * 100 = 25%',
          explanation: 'Profit percentage uses Cost Price as the denominator.'
        }
      },
      practice: {
        question: 'An item bought for $80 is sold for $100. What is the profit percentage?',
        options: [
          { id: 'A', text: '25%' },
          { id: 'B', text: '20%' },
          { id: 'C', text: '15%' },
          { id: 'D', text: '30%' }
        ],
        correctAnswerId: 'A',
        explanation: 'Profit = $20. Profit % = ($20 / $80) * 100 = 25%.'
      },
      review: {
        title: 'Profit & Loss Review',
        pitfalls: ['Calculating profit percentage using Selling Price instead of Cost Price'],
        edgeCases: ['False weights or dishonest trader problems'],
        keyTakeaway: 'Profit percentage base is strictly Cost Price.'
      },
      interview: {
        title: 'Technical Viva: Equivalent Single Discount',
        question: 'What single discount is equivalent to successive discounts of 20% and 10%?',
        hint: '100 -> 80 -> 72.',
        keyPoints: ['Price after 20% discount = 80%', 'Price after subsequent 10% discount = 80% * 0.9 = 72%', 'Equivalent single discount = 100% - 72% = 28%']
      }
    },
    {
      id: 'apt-m4',
      topicKey: 'time-work',
      title: 'Profit, Loss & Discounts',
      description: 'Master rate calculations, combined efficiency, and pipe filling rates.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Work Rate Principles',
        content: 'Work rate per day is reciprocal of total days to complete work. Rates add when working together.',
        interactiveExample: {
          language: 'text',
          code: 'Rate A = 1/10 per day, Rate B = 1/15 per day\nCombined Rate = 1/10 + 1/15 = 1/6 per day -> 6 days to finish',
          explanation: 'Work rates add linearly.'
        }
      },
      practice: {
        question: 'A completes a job in 10 days; B in 15 days. How long working together?',
        options: [
          { id: 'A', text: '6 days' },
          { id: 'B', text: '8 days' },
          { id: 'C', text: '12.5 days' },
          { id: 'D', text: '5 days' }
        ],
        correctAnswerId: 'A',
        explanation: '1/10 + 1/15 = 5/30 = 1/6 job/day = 6 days.'
      },
      review: {
        title: 'Time & Work Review',
        pitfalls: ['Adding days directly (10 + 15) instead of adding daily work rates'],
        edgeCases: ['Negative rates from draining leak pipes in cistern problems'],
        keyTakeaway: 'Always convert time duration to fractional work rate per unit time.'
      },
      interview: {
        title: 'Technical Viva: Pipes and Cisterns',
        question: 'Pipe A fills in 4h, Pipe B in 6h, Leak C drains in 12h. How long to fill together?',
        hint: '1/4 + 1/6 - 1/12.',
        keyPoints: ['Rate = 3/12 + 2/12 - 1/12 = 4/12 = 1/3 per hour', 'Tank fills completely in 3 hours']
      }
    },
    {
      id: 'apt-m5',
      topicKey: 'time-speed-distance',
      title: 'Time, Speed & Distance',
      description: 'Master relative speed, train crossings, and stream vector calculations.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Relative Speed Mechanics',
        content: 'Speed = Distance / Time. When moving in opposite directions, relative speed = Speed A + Speed B.',
        interactiveExample: {
          language: 'text',
          code: 'Convert km/h to m/s: multiply by (5 / 18)\n60 km/h * (5 / 18) = 16.67 m/s',
          explanation: 'Conversion factor 5/18 maps km/h to m/s.'
        }
      },
      practice: {
        question: 'What is 180 km in 3 hours expressed in meters per second (m/s)?',
        options: [
          { id: 'A', text: '16.67 m/s' },
          { id: 'B', text: '60 m/s' },
          { id: 'C', text: '20 m/s' },
          { id: 'D', text: '15 m/s' }
        ],
        correctAnswerId: 'A',
        explanation: 'Speed = 60 km/h. 60 * 5/18 = 16.67 m/s.'
      },
      review: {
        title: 'Speed & Distance Review',
        pitfalls: ['Forgetting train length when calculating train passing stationary platform total distance'],
        edgeCases: ['Downstream vs Upstream boat speeds relative to water current'],
        keyTakeaway: 'Total distance when passing platform = Train length + Platform length.'
      },
      interview: {
        title: 'Technical Viva: Average Speed Formula',
        question: 'Why is average speed for equal distances at speeds x and y equal to `2xy / (x + y)`?',
        hint: 'Harmonic mean of speeds.',
        keyPoints: ['Average speed = Total Distance / Total Time', 'D / (D/x + D/y) simplifies to 2xy / (x + y)']
      }
    },
    {
      id: 'apt-m6',
      topicKey: 'probability',
      title: 'Time & Work',
      description: 'Master sample spaces, favorable outcomes, independent events, and Bayes theorem.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Probability Fundamentals',
        content: 'Probability = Favorable Outcomes / Total Outcomes. For independent events, P(A and B) = P(A) * P(B).',
        interactiveExample: {
          language: 'text',
          code: 'Rolling 7 on 2 dice: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) -> 6/36 = 1/6',
          explanation: '6 favorable sum-7 pairs out of 36 sample space outcomes.'
        }
      },
      practice: {
        question: 'What is the probability of rolling a sum of 7 with two fair 6-sided dice?',
        options: [
          { id: 'A', text: '1/6' },
          { id: 'B', text: '1/12' },
          { id: 'C', text: '7/36' },
          { id: 'D', text: '5/36' }
        ],
        correctAnswerId: 'A',
        explanation: '6 favorable outcomes out of 36 total = 1/6.'
      },
      review: {
        title: 'Probability Review',
        pitfalls: ['Adding probabilities of non-mutually exclusive events without subtracting intersection P(A n B)'],
        edgeCases: ['Sampling without replacement changing base total outcomes'],
        keyTakeaway: 'P(A U B) = P(A) + P(B) - P(A n B).'
      },
      interview: {
        title: 'Technical Viva: Monty Hall Problem',
        question: 'In the Monty Hall problem with 3 doors, should you switch doors after a goat is revealed?',
        hint: 'Initial door probability 1/3 vs remaining door probability 2/3.',
        keyPoints: ['Switching doubles probability of winning from 1/3 to 2/3', 'Host revealing goat concentrates probability on unchosen unopened door']
      }
    },
    {
      id: 'apt-m7',
      topicKey: 'permutations-combinations',
      title: 'Probability Fundamentals',
      description: 'Master nPr arrangements, nCr combinations, and circular permutations.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Permutations vs Combinations',
        content: 'Permutations count ordered arrangements (`n! / (n-r)!`). Combinations count un-ordered selections (`n! / (r!(n-r)!)`).',
        interactiveExample: {
          language: 'text',
          code: 'Arranging "LEADER": 6 letters, 2 "E"s -> 6! / 2! = 360 unique arrangements',
          explanation: 'Divide by duplicate letter factorials.'
        }
      },
      practice: {
        question: 'How many distinct arrangements exist for the word "LEADER"?',
        options: [
          { id: 'A', text: '360' },
          { id: 'B', text: '720' },
          { id: 'C', text: '120' },
          { id: 'D', text: '480' }
        ],
        correctAnswerId: 'A',
        explanation: '6! / 2! = 720 / 2 = 360.'
      },
      review: {
        title: 'Permutations Review',
        pitfalls: ['Using Permutations when element order does not matter (use Combinations)'],
        edgeCases: ['Circular permutations where relative arrangement count is (n-1)!'],
        keyTakeaway: 'Order matters in Permutations; order does not matter in Combinations.'
      },
      interview: {
        title: 'Technical Viva: Handshake Problem',
        question: 'If 10 people meet and everyone shakes hands once with everyone else, how many total handshakes occur?',
        hint: '10C2 combination.',
        keyPoints: ['Selecting 2 people out of 10 = 10C2', '(10 * 9) / 2 = 45 total handshakes']
      }
    },
    {
      id: 'apt-m8',
      topicKey: 'logical-reasoning',
      title: 'Permutations & Combinations',
      description: 'Master number series, clock hand angles, seating logic, and charts.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Logical Reasoning & Clock Mechanics',
        content: 'Clock hands move continuously: Minute hand = 6°/min, Hour hand = 0.5°/min. Angle = `|30*H - 5.5*M|`.',
        interactiveExample: {
          language: 'text',
          code: 'Angle at 3:30: |30*(3) - 5.5*(30)| = |90 - 165| = 75°',
          explanation: 'Standard clock angle absolute formula.'
        }
      },
      practice: {
        question: 'What is the angle between clock hands at 3:30?',
        options: [
          { id: 'A', text: '75 degrees' },
          { id: 'B', text: '90 degrees' },
          { id: 'C', text: '105 degrees' },
          { id: 'D', text: '60 degrees' }
        ],
        correctAnswerId: 'A',
        explanation: 'Minute hand = 180°. Hour hand = 105°. Difference = 75°.'
      },
      review: {
        title: 'Logical Reasoning Review',
        pitfalls: ['Assuming linear number series patterns when second-order difference patterns apply'],
        edgeCases: ['Reflex angles (> 180°) requiring subtraction from 360°'],
        keyTakeaway: 'Look for second-order differences or geometric ratios in number series.'
      },
      interview: {
        title: 'Technical Viva: Clock Hands Overlap',
        question: 'How many times do the hour and minute hands of a clock overlap in 24 hours?',
        hint: '22 times in 24 hours.',
        keyPoints: ['Minute hand catches hour hand 11 times every 12 hours', 'Total overlaps in 24 hours = 22 times']
      }
    }
  ]
};
