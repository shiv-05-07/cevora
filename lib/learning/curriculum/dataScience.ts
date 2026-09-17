import { SubjectCurriculum } from './types';

export const dataScienceCurriculum: SubjectCurriculum = {
  key: 'data-science',
  label: 'Data Science',
  roadmapTitle: 'Data Science & Analytics Track',
  roadmapDescription: 'Master data analysis, Pandas manipulation, statistical inference, visualization, SQL aggregation, and exploratory data analysis.',
  roadmapSteps: [
    { id: 'ds-1', topicKey: 'python-for-data-analysis', title: 'Python for Data Analysis', description: 'Data structures, file handling, and computational workflows for data analysis.', order: 1, estimatedMinutes: 45 },
    { id: 'ds-2', topicKey: 'numpy-numerical-data', title: 'NumPy — Numerical Data', description: 'Arrays, matrices, mathematical aggregations, and vectorized calculations.', order: 2, estimatedMinutes: 45 },
    { id: 'ds-3', topicKey: 'pandas-tables', title: 'Pandas — Working With Tables', description: 'Series, DataFrames, indexing, filtering, grouping, and merging datasets.', order: 3, estimatedMinutes: 45 },
    { id: 'ds-4', topicKey: 'data-cleaning', title: 'Data Cleaning — Missing & Invalid Values', description: 'Imputation strategies, deduplication, type casting, and anomaly filtering.', order: 4, estimatedMinutes: 45 },
    { id: 'ds-5', topicKey: 'exploratory-data-analysis', title: 'EDA — Finding Patterns in Data', description: 'Univariate/multivariate analysis, correlation matrices, and distribution metrics.', order: 5, estimatedMinutes: 60 },
    { id: 'ds-6', topicKey: 'statistics-distributions', title: 'Statistics — Distributions & Variability', description: 'Hypothesis testing, confidence intervals, p-values, and statistical significance.', order: 6, estimatedMinutes: 60 },
    { id: 'ds-7', topicKey: 'data-visualization', title: 'Visualization — Choosing the Right Chart', description: 'Matplotlib, Seaborn, plotting distributions, heatmaps, and storytelling.', order: 7, estimatedMinutes: 60 },
    { id: 'ds-8', topicKey: 'sql-for-data-science', title: 'SQL — Aggregation & Filtering', description: 'GROUP BY, HAVING, window functions, and analytical SQL queries.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building analytical, statistical, and data-wrangling mastery for data science roles.",
    nextStep: "Complete today's Data Science mission to uncover patterns and aggregate business datasets."
  },
  diagnosticQuestions: [
    {
      id: 'ds_dq1',
      subjectKey: 'data-science',
      conceptKey: 'pandas-tables',
      concept: 'Pandas DataFrames',
      difficulty: 'BEGINNER',
      question: 'Which Pandas method is used to display summary statistics (mean, std, min, max) for numeric columns?',
      options: [
        { id: 'A', text: 'df.describe()' },
        { id: 'B', text: 'df.info()' },
        { id: 'C', text: 'df.summary()' },
        { id: 'D', text: 'df.stats()' }
      ],
      correctAnswer: 'A',
      explanation: 'df.describe() computes count, mean, std, percentiles, min, and max for numerical columns.'
    },
    {
      id: 'ds_dq2',
      subjectKey: 'data-science',
      conceptKey: 'data-cleaning',
      concept: 'Missing Data Imputation',
      difficulty: 'BEGINNER',
      question: 'Which Pandas method is used to fill null values with a specified default value or statistic?',
      options: [
        { id: 'A', text: 'df.fillna()' },
        { id: 'B', text: 'df.dropna()' },
        { id: 'C', text: 'df.replace()' },
        { id: 'D', text: 'df.clean()' }
      ],
      correctAnswer: 'A',
      explanation: 'fillna() replaces NA/NaN entries with specified values or computed column means.'
    },
    {
      id: 'ds_dq3',
      subjectKey: 'data-science',
      conceptKey: 'exploratory-data-analysis',
      concept: 'Correlation',
      difficulty: 'INTERMEDIATE',
      question: 'What does a Pearson correlation coefficient of -0.92 between two numeric features indicate?',
      options: [
        { id: 'A', text: 'Strong inverse (negative) linear relationship' },
        { id: 'B', text: 'Weak positive relationship' },
        { id: 'C', text: 'No linear relationship' },
        { id: 'D', text: 'Identical data columns' }
      ],
      correctAnswer: 'A',
      explanation: 'A correlation near -1 indicates a strong inverse relationship: as one variable increases, the other decreases.'
    },
    {
      id: 'ds_dq4',
      subjectKey: 'data-science',
      conceptKey: 'statistics-distributions',
      concept: 'Hypothesis Testing',
      difficulty: 'INTERMEDIATE',
      question: 'In hypothesis testing, what does a p-value less than alpha = 0.05 indicate?',
      options: [
        { id: 'A', text: 'Reject the null hypothesis; observed result is statistically significant' },
        { id: 'B', text: 'Accept the null hypothesis' },
        { id: 'C', text: 'The dataset has 5% missing values' },
        { id: 'D', text: 'The test failed due to calculation errors' }
      ],
      correctAnswer: 'A',
      explanation: 'A p-value < 0.05 indicates strong evidence against the null hypothesis, rejecting it.'
    },
    {
      id: 'ds_dq5',
      subjectKey: 'data-science',
      conceptKey: 'data-visualization',
      concept: 'Data Visualization',
      difficulty: 'INTERMEDIATE',
      question: 'Which chart type is best suited for visualising the distribution and quartiles of a single continuous feature?',
      options: [
        { id: 'A', text: 'Box Plot (Box-and-Whisker)' },
        { id: 'B', text: 'Pie Chart' },
        { id: 'C', text: 'Line Chart' },
        { id: 'D', text: 'Scatter Plot' }
      ],
      correctAnswer: 'A',
      explanation: 'Box plots display median, interquartile range (IQR), and potential outliers effectively.'
    },
    {
      id: 'ds_dq6',
      subjectKey: 'data-science',
      conceptKey: 'sql-for-data-science',
      concept: 'SQL Window Functions',
      difficulty: 'ADVANCED',
      question: 'What is the purpose of SQL Window Functions like `ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)`?',
      options: [
        { id: 'A', text: 'Perform calculations across a set of table rows related to the current row without collapsing them into a single row' },
        { id: 'B', text: 'Create new database table indexes' },
        { id: 'C', text: 'Encrypt query text' },
        { id: 'D', text: 'Delete duplicate rows automatically' }
      ],
      correctAnswer: 'A',
      explanation: 'Window functions calculate running aggregates, ranks, and moving averages while preserving individual row outputs.'
    },
    {
      id: 'ds_dq7',
      subjectKey: 'data-science',
      conceptKey: 'exploratory-data-analysis',
      concept: 'Data Normalization',
      difficulty: 'ADVANCED',
      question: 'Why is log transformation often applied to right-skewed data features (e.g. Income or Transaction Amounts)?',
      options: [
        { id: 'A', text: 'Reduces heavy right-tail skewness, making the distribution closer to normal' },
        { id: 'B', text: 'Converts positive numbers to negative' },
        { id: 'C', text: 'Removes all zero values' },
        { id: 'D', text: 'Sorts rows alphabetically' }
      ],
      correctAnswer: 'A',
      explanation: 'Log transforms compress large positive extreme values, variance-stabilizing right-skewed data distributions.'
    },
    {
      id: 'ds_dq8',
      subjectKey: 'data-science',
      conceptKey: 'statistics-distributions',
      concept: 'A/B Testing',
      difficulty: 'ADVANCED',
      question: 'What statistical test is commonly used in A/B testing to determine if two sample means differ significantly?',
      options: [
        { id: 'A', text: 'Two-Sample Student\'s t-Test' },
        { id: 'B', text: 'Linear Regression' },
        { id: 'C', text: 'K-Means' },
        { id: 'D', text: 'Principal Component Analysis' }
      ],
      correctAnswer: 'A',
      explanation: 'A two-sample t-test compares means between Control (A) and Variant (B) groups for statistical significance.'
    }
  ],
  missions: [
    {
      id: 'ds-m1',
      topicKey: 'python-for-data-analysis',
      title: 'Python for Data Analysis',
      description: 'Master Python data wrangling workflow fundamentals for analytics.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Data Science Python Workflows',
        content: 'Data science relies on Python for loading CSV/JSON files, querying databases, and applying data transformations.',
        interactiveExample: {
          language: 'python',
          code: 'import csv\nwith open("data.csv") as f:\n  reader = csv.DictReader(f)',
          explanation: 'DictReader parses tabular CSV rows into Python dictionaries.'
        }
      },
      practice: {
        question: 'Which Pandas function loads a CSV file into a DataFrame?',
        options: [
          { id: 'A', text: 'pd.read_csv()' },
          { id: 'B', text: 'pd.open_csv()' },
          { id: 'C', text: 'pd.parse_file()' },
          { id: 'D', text: 'pd.load_table()' }
        ],
        correctAnswerId: 'A',
        explanation: 'pd.read_csv() parses CSV files directly into Pandas DataFrames.'
      },
      review: {
        title: 'Data Analysis Review',
        pitfalls: ['Reading entire large multi-gigabyte files into RAM without chunking'],
        edgeCases: ['Malformed CSV rows with unequal delimiter counts'],
        keyTakeaway: 'Utilize chunksize when processing massive datasets in Python.'
      },
      interview: {
        title: 'Technical Viva: Data Science Stack',
        question: 'What are the core libraries in the Python Data Science stack?',
        hint: 'NumPy, Pandas, Matplotlib, Seaborn, SciPy, Scikit-Learn.',
        keyPoints: ['NumPy for fast arrays', 'Pandas for tabular manipulation', 'Matplotlib/Seaborn for visualization']
      }
    },
    {
      id: 'ds-m2',
      topicKey: 'numpy-numerical-data',
      title: 'NumPy — Numerical Data Manipulation',
      description: 'Master matrix operations, math aggregations, and masking.',
      estimatedMinutes: 45,
      lesson: {
        title: 'NumPy Numerical Aggregations',
        content: 'NumPy computes high-speed aggregations across matrix axes (`axis=0` for columns, `axis=1` for rows).',
        interactiveExample: {
          language: 'python',
          code: 'import numpy as np\nmat = np.array([[1, 2], [3, 4]])\ncol_means = np.mean(mat, axis=0)',
          explanation: 'axis=0 evaluates calculations down matrix columns.'
        }
      },
      practice: {
        question: 'How do you filter elements in a NumPy array matching a condition `arr > 5`?',
        options: [
          { id: 'A', text: 'Boolean Indexing / Masking: arr[arr > 5]' },
          { id: 'B', text: 'arr.filter(5)' },
          { id: 'C', text: 'arr.search(5)' },
          { id: 'D', text: 'arr.where_greater(5)' }
        ],
        correctAnswerId: 'A',
        explanation: 'Boolean masking returns elements where condition evaluates to True.'
      },
      review: {
        title: 'NumPy Review',
        pitfalls: ['Confusing axis=0 (column operations) with axis=1 (row operations)'],
        edgeCases: ['NaN values propagating through sum and mean calculations'],
        keyTakeaway: 'Use `np.nanmean()` and `np.nansum()` to ignore missing NaN data.'
      },
      interview: {
        title: 'Technical Viva: Vectorized Operations',
        question: 'What is vectorization and why is it preferred over loops?',
        hint: 'C-level loops and SIMD hardware execution.',
        keyPoints: ['Replaces explicit loops with C-optimized matrix routines', 'Executes operations in parallel across array blocks']
      }
    },
    {
      id: 'ds-m3',
      topicKey: 'pandas-tables',
      title: 'Pandas — Working With Tables',
      description: 'Master Series, DataFrames, indexing, and GroupBy operations.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Pandas DataFrames & GroupBy',
        content: 'Pandas DataFrames structure data into labeled columns and rows. `groupby()` aggregates metrics per category.',
        interactiveExample: {
          language: 'python',
          code: 'df.groupby("category")["sales"].sum()',
          explanation: 'Split-Apply-Combine paradigm calculates total sales by category.'
        }
      },
      practice: {
        question: 'Which method displays summary statistics for numeric DataFrame columns?',
        options: [
          { id: 'A', text: 'df.describe()' },
          { id: 'B', text: 'df.summary()' },
          { id: 'C', text: 'df.info()' },
          { id: 'D', text: 'df.stats()' }
        ],
        correctAnswerId: 'A',
        explanation: 'describe() summarizes count, mean, std, percentiles, min, and max.'
      },
      review: {
        title: 'Pandas Review',
        pitfalls: ['SettingValueWithCopyWarning when modifying sliced DataFrame views'],
        edgeCases: ['Re-indexing DataFrames with duplicate row index entries'],
        keyTakeaway: 'Use `.loc[]` and `.iloc[]` for explicit, warning-free indexing.'
      },
      interview: {
        title: 'Technical Viva: `.loc` vs `.iloc`',
        question: 'What is the difference between `.loc` and `.iloc` in Pandas?',
        hint: 'Label-based indexing vs integer position-based indexing.',
        keyPoints: ['.loc selects data by label or boolean mask', '.iloc selects data by integer positional index']
      }
    },
    {
      id: 'ds-m4',
      topicKey: 'data-cleaning',
      title: 'Data Cleaning — Missing & Invalid Values',
      description: 'Master data cleaning, missing value imputation, and type conversion.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Data Cleaning Strategies',
        content: 'Cleaning involves handling missing data (`fillna`, `dropna`), removing duplicates, and fixing inconsistent data types.',
        interactiveExample: {
          language: 'python',
          code: 'df["age"] = df["age"].fillna(df["age"].median())',
          explanation: 'Imputing missing age entries with median values preserves row records.'
        }
      },
      practice: {
        question: 'Which Pandas method drops rows containing missing values?',
        options: [
          { id: 'A', text: 'df.dropna()' },
          { id: 'B', text: 'df.fillna()' },
          { id: 'C', text: 'df.clear()' },
          { id: 'D', text: 'df.remove_null()' }
        ],
        correctAnswerId: 'A',
        explanation: 'dropna() removes rows or columns containing NaN values.'
      },
      review: {
        title: 'Data Cleaning Review',
        pitfalls: ['Dropping missing value rows indiscriminately without analyzing missingness mechanisms'],
        edgeCases: ['Invisible whitespace characters in string columns preventing correct joins'],
        keyTakeaway: 'Strip whitespace and inspect null counts with `df.isnull().sum()`.'
      },
      interview: {
        title: 'Technical Viva: Handling Missing Data',
        question: 'How do you decide between dropping missing values vs imputing them?',
        hint: 'Percentage of missing data and missing data mechanisms (MCAR, MAR, MNAR).',
        keyPoints: ['If < 5% data is missing, dropping may be safe', 'For larger missingness, impute with median, mean, or model-based imputation']
      }
    },
    {
      id: 'ds-m5',
      topicKey: 'exploratory-data-analysis',
      title: 'EDA — Finding Patterns in Data',
      description: 'Master Exploratory Data Analysis, correlation matrices, and distribution metrics.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Exploratory Data Analysis Principles',
        content: 'EDA uncovers patterns, checks assumptions, and tests hypotheses using summary statistics and graphical representations.',
        interactiveExample: {
          language: 'python',
          code: 'corr = df.corr()\nimport seaborn as sns\nsns.heatmap(corr, annot=True)',
          explanation: 'Heatmaps visualize pairwise feature correlation metrics.'
        }
      },
      practice: {
        question: 'What does a Pearson correlation coefficient of +0.95 between two variables signify?',
        options: [
          { id: 'A', text: 'Strong positive linear correlation' },
          { id: 'B', text: 'No correlation' },
          { id: 'C', text: 'Negative correlation' },
          { id: 'D', text: 'Statistical error' }
        ],
        correctAnswerId: 'A',
        explanation: 'Correlation near +1 indicates strong direct positive linear relationship.'
      },
      review: {
        title: 'EDA Review',
        pitfalls: ['Relying solely on summary statistics without plotting data (e.g. Anscombe\'s Quartet)'],
        edgeCases: ['Outliers distorting scale ranges in linear plots'],
        keyTakeaway: 'Always plot distributions visually during initial data exploration.'
      },
      interview: {
        title: 'Technical Viva: Anscombe\'s Quartet',
        question: 'What is Anscombe\'s Quartet and what lesson does it teach data scientists?',
        hint: 'Four datasets with identical summary statistics but completely different graph shapes.',
        keyPoints: ['Demonstrates why numerical summaries alone are insufficient', 'Visual data plotting is essential before statistical modeling']
      }
    },
    {
      id: 'ds-m6',
      topicKey: 'statistics-distributions',
      title: 'Statistics — Distributions & Variability',
      description: 'Master hypothesis testing, p-values, and statistical inference.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Statistical Significance and Hypothesis Testing',
        content: 'Hypothesis testing evaluates whether observed differences between groups are statistically significant or due to chance.',
        interactiveExample: {
          language: 'python',
          code: 'from scipy import stats\nt_stat, p_val = stats.ttest_ind(group_a, group_b)',
          explanation: 'Two-sample t-test calculates p-value between sample means.'
        }
      },
      practice: {
        question: 'What does a p-value less than alpha = 0.05 indicate in a hypothesis test?',
        options: [
          { id: 'A', text: 'Reject the null hypothesis (statistically significant difference)' },
          { id: 'B', text: 'Accept the null hypothesis' },
          { id: 'C', text: 'Invalid test execution' },
          { id: 'D', text: '5% sample size' }
        ],
        correctAnswerId: 'A',
        explanation: 'p-value < 0.05 provides evidence against the null hypothesis, rejecting it.'
      },
      review: {
        title: 'Statistics Review',
        pitfalls: ['P-hacking: running multiple un-adjusted tests until finding a p < 0.05 result'],
        edgeCases: ['Small sample sizes violating normality assumptions'],
        keyTakeaway: 'Define hypotheses and significance thresholds before running tests.'
      },
      interview: {
        title: 'Technical Viva: Type I vs Type II Errors',
        question: 'What is the difference between a Type I and a Type II error?',
        hint: 'False Positive vs False Negative.',
        keyPoints: ['Type I error: Rejecting true null hypothesis (False Positive, alpha)', 'Type II error: Failing to reject false null hypothesis (False Negative, beta)']
      }
    },
    {
      id: 'ds-m7',
      topicKey: 'data-visualization',
      title: 'Visualization — Choosing the Right Chart',
      description: 'Master visual data storytelling using Matplotlib and Seaborn.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Data Storytelling & Chart Selection',
        content: 'Choose visual charts based on feature types: Bar charts for categories, Histograms for continuous distributions, Scatter plots for relationships.',
        interactiveExample: {
          language: 'python',
          code: 'import matplotlib.pyplot as plt\nplt.hist(df["age"], bins=20)\nplt.title("Age Distribution")',
          explanation: 'Histograms reveal distribution shape and skewness.'
        }
      },
      practice: {
        question: 'Which chart type is best for visualising relationships between two continuous numeric variables?',
        options: [
          { id: 'A', text: 'Scatter Plot' },
          { id: 'B', text: 'Pie Chart' },
          { id: 'C', text: 'Bar Chart' },
          { id: 'D', text: 'Stacked Column Chart' }
        ],
        correctAnswerId: 'A',
        explanation: 'Scatter plots map two continuous variables along X and Y axes to display correlation.'
      },
      review: {
        title: 'Visualization Review',
        pitfalls: ['Using 3D pie charts or truncating Y-axis baselines misleading viewers'],
        edgeCases: ['Overplotting in large datasets with overlapping points'],
        keyTakeaway: 'Keep visualizations clean, labeled, and start quantitative Y-axes at zero.'
      },
      interview: {
        title: 'Technical Viva: Visualizing Large Data',
        question: 'How do you handle overplotting in scatter plots with millions of data points?',
        hint: 'Alpha transparency, hexbin plots, and 2D density plots.',
        keyPoints: ['Use point alpha transparency (e.g. `alpha=0.1`)', 'Use Hexbin plots or 2D Kernel Density Estimation (KDE)']
      }
    },
    {
      id: 'ds-m8',
      topicKey: 'sql-for-data-science',
      title: 'SQL — Aggregation & Filtering',
      description: 'Master SQL GROUP BY, HAVING, subqueries, and window functions for analytics.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Analytical SQL Queries',
        content: 'Analytical queries aggregate business metrics using GROUP BY, filter aggregates with HAVING, and calculate running totals with window functions.',
        interactiveExample: {
          language: 'sql',
          code: 'SELECT department, AVG(salary) FROM employees GROUP BY department HAVING COUNT(*) > 5;',
          explanation: 'HAVING filters aggregate results calculated by GROUP BY.'
        }
      },
      practice: {
        question: 'What is the key difference between WHERE and HAVING clauses in SQL?',
        options: [
          { id: 'A', text: 'WHERE filters individual rows before grouping; HAVING filters aggregated group results after GROUP BY' },
          { id: 'B', text: 'WHERE is used only for text; HAVING is used for numbers' },
          { id: 'C', text: 'HAVING runs faster than WHERE' },
          { id: 'D', text: 'WHERE is used only in subqueries' }
        ],
        correctAnswerId: 'A',
        explanation: 'WHERE filters rows prior to aggregation; HAVING filters aggregated groups.'
      },
      review: {
        title: 'Analytical SQL Review',
        pitfalls: ['Referencing aggregated column aliases inside the WHERE clause'],
        edgeCases: ['NULL handling during COUNT(*) vs COUNT(column_name)'],
        keyTakeaway: 'Use `COUNT(*)` to count all rows; `COUNT(col)` excludes NULL values.'
      },
      interview: {
        title: 'Technical Viva: SQL Window Functions',
        question: 'Explain what a SQL Window Function does.',
        hint: 'OVER (PARTITION BY ... ORDER BY ...).',
        keyPoints: ['Computes values across row sets without collapsing rows', 'Useful for running totals, moving averages, and rankings']
      }
    }
  ]
};
