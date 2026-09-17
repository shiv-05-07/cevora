import { SubjectCurriculum } from './types';

export const aiMlCurriculum: SubjectCurriculum = {
  key: 'ai-ml',
  label: 'AI / ML',
  roadmapTitle: 'Artificial Intelligence & Machine Learning Track',
  roadmapDescription: 'Master numerical computing in Python, data preprocessing, machine learning algorithms, model evaluation, and modern AI workflows.',
  roadmapSteps: [
    { id: 'aiml-1', topicKey: 'python-for-ml', title: 'Python for AI/ML', description: 'List comprehensions, numerical functions, and Python data workflows for ML.', order: 1, estimatedMinutes: 45 },
    { id: 'aiml-2', topicKey: 'numpy-pandas', title: 'NumPy & Pandas', description: 'N-dimensional array vectorization, DataFrame manipulation, indexing, and slicing.', order: 2, estimatedMinutes: 45 },
    { id: 'aiml-3', topicKey: 'data-preprocessing', title: 'Data Cleaning & Preprocessing', description: 'Handling missing values, outlier detection, one-hot encoding, and feature scaling.', order: 3, estimatedMinutes: 45 },
    { id: 'aiml-4', topicKey: 'statistics-probability', title: 'Statistics & Probability', description: 'Descriptive statistics, normal distributions, Bayes theorem, and hypothesis testing.', order: 4, estimatedMinutes: 45 },
    { id: 'aiml-5', topicKey: 'supervised-learning', title: 'Supervised Learning & Regression', description: 'Features, labels, train/test splits, loss functions, and Linear Regression.', order: 5, estimatedMinutes: 60 },
    { id: 'aiml-6', topicKey: 'unsupervised-learning', title: 'Classification & Clustering', description: 'Logistic Regression, Decision Trees, K-Means clustering, and distance metrics.', order: 6, estimatedMinutes: 60 },
    { id: 'aiml-7', topicKey: 'model-evaluation', title: 'Model Evaluation & Cross Validation', description: 'Confusion matrices, Precision, Recall, F1-Score, ROC-AUC, and K-Fold CV.', order: 7, estimatedMinutes: 60 },
    { id: 'aiml-8', topicKey: 'ml-project', title: 'End-to-End ML Pipeline', description: 'Feature engineering, hyperparameter tuning, model artifact export, and deployment.', order: 8, estimatedMinutes: 60 },
  ],
  learningInsight: {
    overview: "Your current path is building the Python and numerical-computing foundation needed for machine-learning work.",
    nextStep: "Complete today's AI/ML mission to establish vectorization and feature engineering fundamentals."
  },
  diagnosticQuestions: [
    {
      id: 'aiml_dq1',
      subjectKey: 'ai-ml',
      conceptKey: 'python-for-ml',
      concept: 'Training & Validation Data',
      difficulty: 'BEGINNER',
      question: 'What is the primary purpose of splitting a dataset into training and validation sets in Machine Learning?',
      options: [
        { id: 'A', text: 'To evaluate model generalization on unseen data and prevent overfitting' },
        { id: 'B', text: 'To speed up file download times' },
        { id: 'C', text: 'To encrypt sensitive dataset features' },
        { id: 'D', text: 'To automatically remove missing rows' }
      ],
      correctAnswer: 'A',
      explanation: 'Splitting data ensures the model is tested on unseen validation data to detect overfitting.'
    },
    {
      id: 'aiml_dq2',
      subjectKey: 'ai-ml',
      conceptKey: 'numpy-pandas',
      concept: 'NumPy Vectorization',
      difficulty: 'BEGINNER',
      question: 'What is the primary role of NumPy in Python-based Machine Learning workflows?',
      options: [
        { id: 'A', text: 'Provide fast, vectorized n-dimensional array operations in compiled C' },
        { id: 'B', text: 'Render 3D web interfaces' },
        { id: 'C', text: 'Manage HTTP REST endpoints' },
        { id: 'D', text: 'Build mobile application screens' }
      ],
      correctAnswer: 'A',
      explanation: 'NumPy provides contiguous memory vectorization, enabling high-performance matrix computations in Python.'
    },
    {
      id: 'aiml_dq3',
      subjectKey: 'ai-ml',
      conceptKey: 'data-preprocessing',
      concept: 'Feature Scaling',
      difficulty: 'INTERMEDIATE',
      question: 'Why is feature scaling (e.g. StandardScaler, MinMaxScaler) necessary for distance-based algorithms like KNN or Gradient Descent?',
      options: [
        { id: 'A', text: 'Prevents features with large scale ranges from dominating distance metrics and gradient steps' },
        { id: 'B', text: 'Converts target categorical variables into strings' },
        { id: 'C', text: 'Eliminates the need for training labels' },
        { id: 'D', text: 'Increases dataset row count' }
      ],
      correctAnswer: 'A',
      explanation: 'Without scaling, a feature measured in thousands (e.g. salary) outweighs a feature measured in units (e.g. age).'
    },
    {
      id: 'aiml_dq4',
      subjectKey: 'ai-ml',
      conceptKey: 'model-evaluation',
      concept: 'Precision & Recall',
      difficulty: 'INTERMEDIATE',
      question: 'In a classification model, what does Precision measure?',
      options: [
        { id: 'A', text: 'Ratio of true positives to total predicted positive instances: TP / (TP + FP)' },
        { id: 'B', text: 'Ratio of true positives to total actual positive instances: TP / (TP + FN)' },
        { id: 'C', text: 'Total correct predictions divided by total samples' },
        { id: 'D', text: 'Rate of false alarms on negative data' }
      ],
      correctAnswer: 'A',
      explanation: 'Precision answers: Of all items predicted as positive, how many were actually positive? TP / (TP + FP).'
    },
    {
      id: 'aiml_dq5',
      subjectKey: 'ai-ml',
      conceptKey: 'supervised-learning',
      concept: 'Supervised Learning',
      difficulty: 'INTERMEDIATE',
      question: 'When would Logistic Regression be used instead of Linear Regression?',
      options: [
        { id: 'A', text: 'When predicting categorical class outcomes (e.g. Spam vs Not Spam)' },
        { id: 'B', text: 'When predicting continuous house prices' },
        { id: 'C', text: 'When clustering unlabelled data points' },
        { id: 'D', text: 'When compressing image dimensions' }
      ],
      correctAnswer: 'A',
      explanation: 'Logistic Regression uses the sigmoid function to output class probabilities for classification tasks.'
    },
    {
      id: 'aiml_dq6',
      subjectKey: 'ai-ml',
      conceptKey: 'model-evaluation',
      concept: 'Overfitting',
      difficulty: 'INTERMEDIATE',
      question: 'What is overfitting in Machine Learning?',
      options: [
        { id: 'A', text: 'Model performs exceptionally on training data but poorly on validation data' },
        { id: 'B', text: 'Model performs poorly on both training and validation data' },
        { id: 'C', text: 'Dataset contains too many missing values' },
        { id: 'D', text: 'Model training terminates too quickly' }
      ],
      correctAnswer: 'A',
      explanation: 'Overfitting happens when a model learns training noise instead of underlying generalizable relationships.'
    },
    {
      id: 'aiml_dq7',
      subjectKey: 'ai-ml',
      conceptKey: 'model-evaluation',
      concept: 'Cross-Validation',
      difficulty: 'ADVANCED',
      question: 'What is the main advantage of K-Fold Cross-Validation?',
      options: [
        { id: 'A', text: 'Evaluates model performance across K distinct train/validation folds to reduce variance in performance estimates' },
        { id: 'B', text: 'Guarantees 100% test accuracy' },
        { id: 'C', text: 'Eliminates dataset target features' },
        { id: 'D', text: 'Generates synthetic image training samples' }
      ],
      correctAnswer: 'A',
      explanation: 'K-Fold CV averages validation performance across K subsets, ensuring every sample is used for validation once.'
    },
    {
      id: 'aiml_dq8',
      subjectKey: 'ai-ml',
      conceptKey: 'unsupervised-learning',
      concept: 'Clustering',
      difficulty: 'ADVANCED',
      question: 'Which of the following is an Unsupervised Learning task?',
      options: [
        { id: 'A', text: 'K-Means clustering to discover customer segments without target labels' },
        { id: 'B', text: 'Predicting house sale prices from historical features' },
        { id: 'C', text: 'Classifying email messages as Spam or Inbox using labels' },
        { id: 'D', text: 'Fitting a linear line to labelled data points' }
      ],
      correctAnswer: 'A',
      explanation: 'Unsupervised learning discovers hidden structures or clusters in data without predefined ground-truth labels.'
    }
  ],
  missions: [
    {
      id: 'aiml-m1',
      topicKey: 'python-for-ml',
      title: 'Python for AI/ML — Numerical Computing Fundamentals',
      description: 'Master list comprehensions, vector operations, and Python data structures for machine learning.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Python Workflows in Machine Learning',
        content: 'Python provides simple syntax and high-level libraries for mathematical modeling, data manipulation, and model training.',
        interactiveExample: {
          language: 'python',
          code: 'data = [x * 2.5 for x in range(10) if x % 2 == 0]',
          explanation: 'List comprehensions construct transformed numerical collections efficiently.'
        }
      },
      practice: {
        question: 'Which Python structure is most appropriate for storing ordered numerical values before converting into a NumPy array?',
        options: [
          { id: 'A', text: 'List' },
          { id: 'B', text: 'Set' },
          { id: 'C', text: 'Dictionary' },
          { id: 'D', text: 'String' }
        ],
        correctAnswerId: 'A',
        explanation: 'Lists preserve sequence order and support element iteration before array conversion.'
      },
      review: {
        title: 'Python for ML Review',
        pitfalls: ['Using explicit Python `for` loops for large matrix calculations instead of vectorized operations'],
        edgeCases: ['Unexpected mutable object side-effects when modifying lists inside functions'],
        keyTakeaway: 'Use Python native structures for initial data handling, then convert to NumPy arrays for math.'
      },
      interview: {
        title: 'Technical Viva: Python in Machine Learning',
        question: 'Why is Python widely used for machine learning despite being an interpreted language?',
        hint: 'Discuss C/C++ backend library bindings (NumPy, PyTorch, Cuda).',
        keyPoints: ['High-level developer productivity and clean syntax', 'Underlying numeric heavy lifting runs in compiled C/C++/CUDA kernels']
      }
    },
    {
      id: 'aiml-m2',
      topicKey: 'numpy-pandas',
      title: 'NumPy — Arrays, Shapes & Vectorization',
      description: 'Master N-dimensional array manipulation, broadcasting, and Pandas DataFrames.',
      estimatedMinutes: 45,
      lesson: {
        title: 'NumPy Ndarray Mechanics',
        content: 'NumPy `ndarray` stores homogeneous data in contiguous memory blocks. Operations operate element-wise without explicit Python loops.',
        interactiveExample: {
          language: 'python',
          code: 'import numpy as np\na = np.array([1, 2, 3])\nb = a * 10 # Vectorized multiplication: [10, 20, 30]',
          explanation: 'Vectorization runs element-wise operations at compiled C speed.'
        }
      },
      practice: {
        question: 'What does the `shape` property of a NumPy array represent?',
        options: [
          { id: 'A', text: 'A tuple of integers giving the sizes of the array along each dimension' },
          { id: 'B', text: 'The memory footprint size in bytes' },
          { id: 'C', text: 'The data type of array elements' },
          { id: 'D', text: 'The total number of non-zero entries' }
        ],
        correctAnswerId: 'A',
        explanation: 'The `shape` tuple indicates dimension sizes (e.g. `(rows, cols)`).'
      },
      review: {
        title: 'NumPy & Pandas Review',
        pitfalls: ['Attempting matrix multiplication (`@`) on incompatible matrix shapes'],
        edgeCases: ['Broadcasting 1D arrays across 2D matrices'],
        keyTakeaway: 'Always verify array shapes before matrix transformations.'
      },
      interview: {
        title: 'Technical Viva: NumPy Vectorization',
        question: 'Why are vectorized NumPy operations faster than standard Python loops?',
        hint: 'CPU cache locality, C compilation, and SIMD instruction sets.',
        keyPoints: ['Contiguous memory allocation avoids pointer overhead', 'Executed via optimized C/Fortran routines', 'Uses CPU SIMD vector instructions']
      }
    },
    {
      id: 'aiml-m3',
      topicKey: 'data-preprocessing',
      title: 'Data Preprocessing — Missing Values & Scaling',
      description: 'Learn data cleaning, missing value imputation, one-hot encoding, and feature scaling.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Feature Scaling & Transformation',
        content: 'Raw features vary in units (e.g. Age vs Salary). `StandardScaler` standardizes features to mean=0 and variance=1.',
        interactiveExample: {
          language: 'python',
          code: 'from sklearn.preprocessing import StandardScaler\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)',
          explanation: 'StandardScaler normalizes features to prevent scale dominance.'
        }
      },
      practice: {
        question: 'Why is feature scaling essential for distance-based ML models?',
        options: [
          { id: 'A', text: 'Prevents high-magnitude features from dominating distance metrics' },
          { id: 'B', text: 'Automatically removes missing data rows' },
          { id: 'C', text: 'Converts numeric values to strings' },
          { id: 'D', text: 'Increases dataset size' }
        ],
        correctAnswerId: 'A',
        explanation: 'Scaling ensures all features contribute proportionally to distance metrics.'
      },
      review: {
        title: 'Data Preprocessing Review',
        pitfalls: ['Data Leakage: Fitting scaler parameters on validation/test datasets instead of training data only'],
        edgeCases: ['Extreme dataset outliers distorting Min-Max scaling boundaries'],
        keyTakeaway: 'Always fit scalers exclusively on training split data.'
      },
      interview: {
        title: 'Technical Viva: Data Leakage',
        question: 'What is Data Leakage in Machine Learning and how do you prevent it?',
        hint: 'Information from outside the training dataset leaking into model training.',
        keyPoints: ['Information from validation/test set used during feature preprocessing', 'Fit transformers on train set only; apply `.transform()` on test set']
      }
    },
    {
      id: 'aiml-m4',
      topicKey: 'statistics-probability',
      title: 'Statistics — Mean, Variance & Distributions',
      description: 'Master descriptive statistics, probability distributions, and correlation.',
      estimatedMinutes: 45,
      lesson: {
        title: 'Descriptive Statistics and Distributions',
        content: 'Mean, Median, and Variance summarize feature distributions. The Normal Distribution underpins many statistical models.',
        interactiveExample: {
          language: 'python',
          code: 'import numpy as np\nmean = np.mean(data)\nstd = np.std(data)',
          explanation: 'Standard deviation measures spread around the mean.'
        }
      },
      practice: {
        question: 'Which statistic is robust to extreme outliers in a heavily skewed dataset?',
        options: [
          { id: 'A', text: 'Median' },
          { id: 'B', text: 'Mean' },
          { id: 'C', text: 'Variance' },
          { id: 'D', text: 'Standard Deviation' }
        ],
        correctAnswerId: 'A',
        explanation: 'The median represents the 50th percentile and is not pulled by single extreme values.'
      },
      review: {
        title: 'Statistics Review',
        pitfalls: ['Assuming correlation implies direct causality between two variables'],
        edgeCases: ['Bimodal distributions where mean does not represent typical values'],
        keyTakeaway: 'Inspect distribution shape and spread alongside central tendencies.'
      },
      interview: {
        title: 'Technical Viva: Central Limit Theorem',
        question: 'What is the Central Limit Theorem (CLT) and why is it important in ML?',
        hint: 'Sampling distributions of sample means converge to normal distribution as sample size grows.',
        keyPoints: ['Sample means approximate normal distribution regardless of underlying data distribution for large N']
      }
    },
    {
      id: 'aiml-m5',
      topicKey: 'supervised-learning',
      title: 'Supervised Learning — Features, Labels & Training',
      description: 'Master Supervised Learning concepts, Linear Regression, and MSE loss minimization.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Linear Regression and Gradient Descent',
        content: 'Supervised models learn mapping function $f(X) \\to y$. Linear Regression fits weights to minimize Mean Squared Error loss.',
        interactiveExample: {
          language: 'python',
          code: 'from sklearn.linear_model import LinearRegression\nmodel = LinearRegression()\nmodel.fit(X_train, y_train)',
          explanation: 'Fit finds optimal model weight parameters.'
        }
      },
      practice: {
        question: 'What target variable type does Linear Regression predict?',
        options: [
          { id: 'A', text: 'Continuous numeric values' },
          { id: 'B', text: 'Discrete binary classes' },
          { id: 'C', text: 'Text labels' },
          { id: 'D', text: 'Unordered categories' }
        ],
        correctAnswerId: 'A',
        explanation: 'Regression models predict continuous quantities (e.g. price, temperature).'
      },
      review: {
        title: 'Supervised Learning Review',
        pitfalls: ['Evaluating regression models using accuracy instead of MSE/R^2 score'],
        edgeCases: ['Multicollinearity among input feature predictors'],
        keyTakeaway: 'Use MSE, MAE, or R^2 metrics to evaluate continuous regression targets.'
      },
      interview: {
        title: 'Technical Viva: Bias-Variance Tradeoff',
        question: 'Explain the Bias-Variance Tradeoff in Supervised Learning.',
        hint: 'Underfitting vs Overfitting.',
        keyPoints: ['High Bias = Underfitting (model too simple)', 'High Variance = Overfitting (model too sensitive to training noise)', 'Goal = Minimize total error at optimal complexity']
      }
    },
    {
      id: 'aiml-m6',
      topicKey: 'unsupervised-learning',
      title: 'Classification & Clustering',
      description: 'Master Logistic Regression, decision boundaries, and K-Means clustering.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Classification vs Clustering',
        content: 'Logistic Regression uses the Sigmoid function to output class probabilities. K-Means clusters unlabelled data points by centroid distance.',
        interactiveExample: {
          language: 'python',
          code: 'from sklearn.cluster import KMeans\nkmeans = KMeans(n_clusters=3).fit(X)',
          explanation: 'K-Means groups data into K distinct clusters.'
        }
      },
      practice: {
        question: 'Which algorithm is an Unsupervised Learning clustering method?',
        options: [
          { id: 'A', text: 'K-Means' },
          { id: 'B', text: 'Linear Regression' },
          { id: 'C', text: 'Logistic Regression' },
          { id: 'D', text: 'Linear Discriminant Analysis' }
        ],
        correctAnswerId: 'A',
        explanation: 'K-Means clusters data without target ground-truth labels.'
      },
      review: {
        title: 'Classification Review',
        pitfalls: ['Using K-Means without pre-scaling features, skewing distance calculations'],
        edgeCases: ['Imbalanced class datasets (e.g. 99% negative, 1% positive)'],
        keyTakeaway: 'Evaluate classification models with confusion matrices, not raw accuracy alone.'
      },
      interview: {
        title: 'Technical Viva: Sigmoid Function',
        question: 'Why is the Sigmoid function used in Logistic Regression?',
        hint: 'Mapping real values to probabilities between 0 and 1.',
        keyPoints: ['Maps any real input to interval [0, 1]', 'Provides probabilistic interpretation for binary classification']
      }
    },
    {
      id: 'aiml-m7',
      topicKey: 'model-evaluation',
      title: 'Model Evaluation — Accuracy, Precision & Recall',
      description: 'Master confusion matrices, Precision, Recall, F1-Score, and K-Fold CV.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Confusion Matrix and Evaluation Metrics',
        content: 'Precision measures exactness `TP / (TP + FP)`. Recall measures completeness `TP / (TP + FN)`. F1-Score balances both.',
        interactiveExample: {
          language: 'python',
          code: 'from sklearn.metrics import classification_report\nprint(classification_report(y_true, y_pred))',
          explanation: 'Reports precision, recall, and F1-score per class.'
        }
      },
      practice: {
        question: 'When detecting fraud or rare medical conditions where missing a positive case is critical, which metric should be maximized?',
        options: [
          { id: 'A', text: 'Recall' },
          { id: 'B', text: 'Precision' },
          { id: 'C', text: 'Accuracy' },
          { id: 'D', text: 'Specificity' }
        ],
        correctAnswerId: 'A',
        explanation: 'High recall minimizes False Negatives (missing actual positive cases).'
      },
      review: {
        title: 'Model Evaluation Review',
        pitfalls: ['Relying solely on Accuracy on imbalanced datasets (e.g., predicting majority class 100% yields high accuracy with zero utility)'],
        edgeCases: ['Threshold tuning when precision and recall conflict'],
        keyTakeaway: 'Choose evaluation metrics based on business cost of False Positives vs False Negatives.'
      },
      interview: {
        title: 'Technical Viva: ROC-AUC',
        question: 'What does the ROC-AUC curve represent in classification?',
        hint: 'True Positive Rate vs False Positive Rate across classification thresholds.',
        keyPoints: ['Plots True Positive Rate against False Positive Rate', 'AUC = 1.0 indicates perfect separation; AUC = 0.5 is random guessing']
      }
    },
    {
      id: 'aiml-m8',
      topicKey: 'ml-project',
      title: 'End-to-End ML Pipeline',
      description: 'Master feature engineering, pipeline serialization, and deployment.',
      estimatedMinutes: 60,
      lesson: {
        title: 'Production ML Pipelines',
        content: 'Encapsulate feature transformers and estimators inside Scikit-Learn `Pipeline` objects to prevent leakage during deployment.',
        interactiveExample: {
          language: 'python',
          code: 'from sklearn.pipeline import Pipeline\npipe = Pipeline([("scaler", StandardScaler()), ("model", LogisticRegression())])',
          explanation: 'Pipelines chain data preprocessing and model inference seamlessly.'
        }
      },
      practice: {
        question: 'What is the purpose of serializing an ML model to disk (e.g., via Joblib or ONNX)?',
        options: [
          { id: 'A', text: 'To load trained model weights in production servers for inference without re-training' },
          { id: 'B', text: 'To delete dataset features' },
          { id: 'C', text: 'To format code syntax' },
          { id: 'D', text: 'To generate synthetic training labels' }
        ],
        correctAnswerId: 'A',
        explanation: 'Model serialization exports trained weights for production deployment.'
      },
      review: {
        title: 'ML Pipeline Review',
        pitfalls: ['Drift: Model performance degrading over time due to changing real-world feature distributions'],
        edgeCases: ['Input data schema changes in production web requests'],
        keyTakeaway: 'Monitor production model inputs and predictions for data drift.'
      },
      interview: {
        title: 'Technical Viva: Model Monitoring & Drift',
        question: 'What is Data Drift vs Concept Drift in production ML?',
        hint: 'Distribution shift of input features vs shift in relationship between features and target.',
        keyPoints: ['Data Drift: Input distribution P(X) changes over time', 'Concept Drift: Target relationship P(Y|X) changes']
      }
    }
  ]
};
