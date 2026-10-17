// Generator script for 150 rich assessments (30 per subject)
import fs from 'fs';
import path from 'path';

const subjects = [
  {
    courseId: 'c-1',
    courseName: 'Data Analytics with Python & SQL',
    skillTarget: 'Python for Data Analysis & SQL',
    topics: [
      {
        title: 'Pandas Series & DataFrame Creation from Survey CSVs',
        q: 'Which Pandas function is most memory-efficient for reading large CSV survey datasets with specific column types?',
        options: ['pd.read_csv() with dtype and usecols parameters', 'pd.read_table() followed by df.astype()', 'pd.DataFrame.from_records()', 'pd.concat() on chunked iterators only'],
        correct: 0,
        exp: 'Specifying dtype and usecols in pd.read_csv() minimizes memory allocation during file parsing.',
        task: 'Write a Python snippet to load a CSV file "lfs_survey_2025.csv" keeping only columns "district", "age", and "employed", setting "district" as category.',
        code: 'import pandas as pd\n\ndef load_clean_survey(filepath):\n    dtypes = {"district": "category", "age": "int16", "employed": "int8"}\n    cols = ["district", "age", "employed"]\n    df = pd.read_csv(filepath, usecols=cols, dtype=dtypes)\n    return df',
        out: 'DataFrame with 3 optimized columns',
        cap: 'Submit a Jupyter notebook demonstrating memory optimization techniques on a 50MB survey dataset.'
      },
      {
        title: 'Missing Data Identification & Imputation Strategies',
        q: 'When dealing with survey wage data that is missing at random (MAR), why is median imputation preferred over mean imputation?',
        options: ['Median is faster to compute on GPUs', 'Median is resilient to extreme high-income outliers common in wage distributions', 'Mean cannot be computed on numeric floats', 'NISR standards strictly prohibit mathematical averages'],
        correct: 1,
        exp: 'Wage distributions are typically right-skewed; median imputation prevents artificial inflation caused by extreme high earners.',
        task: 'Implement a function that replaces missing values in column "monthly_income" with the median grouped by "education_level".',
        code: 'def impute_income_by_education(df):\n    df["monthly_income"] = df.groupby("education_level")["monthly_income"].transform(lambda x: x.fillna(x.median()))\n    return df',
        out: '0 null values in monthly_income',
        cap: 'Prepare an imputation report contrasting mean, median, and KNN imputation on Rwanda demographic data.'
      },
      {
        title: 'Filtering & Boolean Indexing on Rwanda Demographic Data',
        q: 'In Pandas, what is the correct syntax to filter respondents who are between 16 and 30 years old AND currently employed?',
        options: ['df[df["age"] >= 16 and df["age"] <= 30 and df["employed"] == 1]', 'df[(df["age"] >= 16) & (df["age"] <= 30) & (df["employed"] == 1)]', 'df.filter(age=[16, 30], employed=1)', 'df.query("age between 16, 30 or employed == 1")'],
        correct: 1,
        exp: 'Pandas uses bitwise operators (&, |) and requires parentheses around each boolean condition.',
        task: 'Write a filter that selects youth respondents living in "Gasabo" or "Kicukiro" with completed secondary education.',
        code: 'def filter_target_youth(df):\n    districts = ["Gasabo", "Kicukiro"]\n    cond = (df["age"].between(16, 30)) & (df["district"].isin(districts)) & (df["education"] == "Secondary")\n    return df[cond]',
        out: 'Filtered DataFrame matching criteria',
        cap: 'Produce a filtered cross-tabulation of youth employment across all 3 Kigali districts.'
      },
      {
        title: 'GroupBy Aggregations & Multi-level Indexing',
        q: 'What is the effect of setting as_index=False in a df.groupby(["province", "gender"]) aggregation?',
        options: ['It drops the group keys entirely', 'It returns the grouping columns as regular DataFrame columns rather than an index', 'It enforces single-thread execution', 'It sorts keys in descending order'],
        correct: 1,
        exp: 'as_index=False prevents the grouping columns from becoming hierarchical index levels, returning a flat DataFrame.',
        task: 'Calculate the total labor force and employment percentage grouped by province and gender.',
        code: 'def provincial_gender_summary(df):\n    summary = df.groupby(["province", "gender"], as_index=False).agg(\n        total_population=("respondent_id", "count"),\n        employed_count=("employed", "sum")\n    )\n    summary["emp_rate"] = (summary["employed_count"] / summary["total_population"]) * 100\n    return summary',
        out: 'Provincial aggregation table',
        cap: 'Submit a multi-level grouped aggregation analyzing female labor force participation by district.'
      },
      {
        title: 'Merging & Joining NISR Regional Datasets',
        q: 'Which join type should be used to combine district demographics with economic indicators while keeping all districts even if no indicator exists?',
        options: ['Inner Join', 'Left Join with districts on the left', 'Cross Join', 'Right Join with indicators on the right'],
        correct: 1,
        exp: 'A left join retains all records from the primary reference table (districts) and populates unmatched indicator columns with NaN.',
        task: 'Merge a districts master table with a trade volume table on "district_code", filling missing trade volumes with 0.',
        code: 'def merge_trade_data(districts_df, trade_df):\n    merged = pd.merge(districts_df, trade_df, on="district_code", how="left")\n    merged["trade_volume_rwf"] = merged["trade_volume_rwf"].fillna(0)\n    return merged',
        out: '30 districts retained with 0 for unrecorded trade',
        cap: 'Create a merged master dataset connecting NISR demographic, educational, and agricultural tables.'
      },
      {
        title: 'Time Series Analysis of Seasonal Employment Trends',
        q: 'How should monthly survey dates be converted and resampled to quarterly periods in Pandas?',
        options: ['df["date"].astype("quarter")', 'pd.to_datetime(df["date"]) followed by df.resample("QE").mean()', 'df.groupby("quarter").sum()', 'pd.date_range() without conversion'],
        correct: 1,
        exp: 'Converting to datetime and using resample("QE") aggregates time-series records into calendar quarters.',
        task: 'Convert string column "survey_month" to datetime, set as index, and compute quarterly average agricultural employment.',
        code: 'def quarterly_employment_trend(df):\n    df["survey_month"] = pd.to_datetime(df["survey_month"])\n    df = df.set_index("survey_month")\n    quarterly = df["agri_employment"].resample("QE").mean()\n    return quarterly',
        out: 'Quarterly aggregated time-series Series',
        cap: 'Analyze 4 years of quarterly agricultural employment data identifying harvest peak seasons.'
      },
      {
        title: 'String Manipulation & Text Cleaning on Survey Responses',
        q: 'Which Pandas string accessor method safely extracts numerical district codes from strings like "DIST-01-GASABO"?',
        options: ['df["code"].str.slice(0, 2)', 'df["code"].str.extract(r"DIST-(\\d+)")', 'df["code"].split("-")[1]', 'df["code"].regex_match()'],
        correct: 1,
        exp: 'str.extract() with a capturing group safely pulls matched patterns into a new column.',
        task: 'Extract numeric district IDs and standardize district names to title case.',
        code: 'def standardize_location_strings(df):\n    df["district_id"] = df["raw_code"].str.extract(r"(\\d+)").astype(int)\n    df["district_name"] = df["raw_name"].str.strip().str.title()\n    return df',
        out: 'district_id: int, district_name: Title Case',
        cap: 'Build a cleaning pipeline for 10,000 raw text survey responses with irregular district spelling.'
      },
      {
        title: 'Categorical Data Encoding & Discretization',
        q: 'What is the primary benefit of converting high-cardinality string columns to category dtype in Pandas?',
        options: ['It automatically translates text to Kinyarwanda', 'It compresses memory usage dramatically by storing unique values in an internal lookup array', 'It sorts strings alphabetically by default', 'It enables SQL injection protection'],
        correct: 1,
        exp: 'The category type stores repeated text as integer codes referencing an internal dictionary, reducing memory footprint by up to 80%.',
        task: 'Convert columns "province", "sector", and "education" to category dtype and create 4 age buckets using pd.cut().',
        code: 'def categorize_demographics(df):\n    for col in ["province", "sector", "education"]:\n        df[col] = df[col].astype("category")\n    bins = [15, 24, 35, 55, 100]\n    labels = ["16-24", "25-35", "36-55", "56+"]\n    df["age_group"] = pd.cut(df["age"], bins=bins, labels=labels)\n    return df',
        out: 'Optimized categories and binned age groups',
        cap: 'Submit a benchmark script comparing memory consumption before and after category encoding.'
      },
      {
        title: 'Reshaping Data with Pivot Tables and Melt',
        q: 'When should you use pd.melt() instead of df.pivot()?',
        options: ['When you want to convert wide-format data (columns as years) into tidy long-format data', 'When you need to compute column correlations', 'When saving data to SQLite databases', 'When you have duplicate primary keys in rows'],
        correct: 0,
        exp: 'pd.melt() unpivots DataFrames from wide to long format, turning multiple measure columns into identifier-variable pairs.',
        task: 'Melt columns "2022", "2023", "2024", "2025" into two columns: "year" and "employment_rate".',
        code: 'def melt_economic_indicators(df):\n    melted = pd.melt(df, id_vars=["district", "indicator_name"], value_vars=["2022", "2023", "2024", "2025"], var_name="year", value_name="employment_rate")\n    melted["year"] = melted["year"].astype(int)\n    return melted',
        out: 'Tidy dataset with year and employment_rate columns',
        cap: 'Reshape a multi-year national accounts report from NISR into tidy analytical format.'
      },
      {
        title: 'Vectorized Numeric Computations with NumPy',
        q: 'Why are vectorized NumPy operations significantly faster than Python for-loops for economic calculations?',
        options: ['NumPy executes code directly on web browsers', 'NumPy operations run in compiled C with contiguous memory buffers, leveraging SIMD CPU vector units', 'Python loops use more internet bandwidth', 'NumPy automatically skips null records'],
        correct: 1,
        exp: 'NumPy arrays store homogeneous data in contiguous memory blocks, executing compiled C loops without Python interpreter overhead.',
        task: 'Calculate weighted average household expenditure using np.average with survey expansion weights.',
        code: 'import numpy as np\n\ndef compute_weighted_expenditure(incomes, weights):\n    valid = ~np.isnan(incomes) & ~np.isnan(weights)\n    return float(np.average(incomes[valid], weights=weights[valid]))',
        out: 'Weighted mean expenditure value',
        cap: 'Write a performance benchmark comparing loop vs vectorized calculations across 1 million simulated survey rows.'
      },
      {
        title: 'Descriptive Statistics & Outlier Detection with IQR',
        q: 'In statistical survey audits, what defines an outlier using the Interquartile Range (IQR) rule?',
        options: ['Values greater than the mean plus one standard deviation', 'Values below Q1 - 1.5 * IQR or above Q3 + 1.5 * IQR', 'Values with z-score exactly 0', 'Any value in the top 10th percentile'],
        correct: 1,
        exp: 'The Tukey boxplot fence rule classifies observations beyond 1.5 times the IQR from the first or third quartile as outliers.',
        task: 'Write a function that flags and filters out income outliers using the 1.5 * IQR threshold.',
        code: 'def filter_income_outliers(df, col="monthly_income"):\n    q1 = df[col].quantile(0.25)\n    q3 = df[col].quantile(0.75)\n    iqr = q3 - q1\n    lower = q1 - 1.5 * iqr\n    upper = q3 + 1.5 * iqr\n    return df[(df[col] >= lower) & (df[col] <= upper)]',
        out: 'Cleaned DataFrame without statistical outliers',
        cap: 'Submit an outlier audit report detailing flagged records in the agricultural harvest weight dataset.'
      },
      {
        title: 'Probability Distributions & Normalcy Checks',
        q: 'Which statistical test is standard for determining whether survey residuals are normally distributed?',
        options: ['Shapiro-Wilk test or D\'Agostino-Pearson omnibus test', 'Pearson correlation coefficient', 'K-Means clustering metric', 'ANOVA F-test only'],
        correct: 0,
        exp: 'Shapiro-Wilk and D\'Agostino tests evaluate the null hypothesis that a sample comes from a normal distribution.',
        task: 'Compute the skewness and kurtosis of household revenue and perform a Shapiro-Wilk test using scipy.stats.',
        code: 'from scipy import stats\n\ndef check_distribution_normality(data_series):\n    skew = float(stats.skew(data_series.dropna()))\n    kurt = float(stats.kurtosis(data_series.dropna()))\n    stat, p_val = stats.shapiro(data_series.dropna().sample(min(500, len(data_series))))\n    return {"skewness": skew, "kurtosis": kurt, "p_value": p_val, "is_normal": p_val > 0.05}',
        out: 'Dictionary with skewness, kurtosis, and normality verdict',
        cap: 'Generate Q-Q plots and normality diagnostic charts for 3 economic indicators.'
      },
      {
        title: 'Hypothesis Testing: Two-Sample T-Tests on Provincial Wages',
        q: 'When conducting an independent two-sample t-test comparing rural vs urban youth wages, what does a p-value < 0.01 imply?',
        options: ['The wages in both sectors are identical', 'There is less than a 1% probability of observing the wage difference by random chance if the true population means were equal', 'The sample size was too small to draw conclusions', 'Urban workers always earn 1% more than rural workers'],
        correct: 1,
        exp: 'A p-value below 0.01 rejects the null hypothesis at the 1% significance level, showing statistically significant difference.',
        task: 'Perform Welch\'s t-test comparing youth wages in Kigali vs Northern Province assuming unequal variances.',
        code: 'from scipy import stats\n\ndef compare_regional_wages(kigali_wages, north_wages):\n    stat, pval = stats.ttest_ind(kigali_wages.dropna(), north_wages.dropna(), equal_var=False)\n    return {"t_statistic": stat, "p_value": pval, "significant_diff": pval < 0.05}',
        out: 'T-statistic and p-value results',
        cap: 'Deliver a hypothesis testing memo analyzing wage disparities between urban and rural districts.'
      },
      {
        title: 'Chi-Square Test of Independence on Education vs Employment',
        q: 'Which test should be used to evaluate whether employment status (Employed / Unemployed) is independent of education tier?',
        options: ['Chi-Square test of independence on a contingency table', 'Paired Student t-test', 'Euclidean distance metric', 'Cosine similarity'],
        correct: 0,
        exp: 'Chi-square test of independence determines whether two categorical variables are related or independent.',
        task: 'Build a contingency table with pd.crosstab and execute scipy.stats.chi2_contingency.',
        code: 'def test_education_employment_independence(df):\n    table = pd.crosstab(df["education"], df["employed"])\n    chi2, p, dof, expected = stats.chi2_contingency(table)\n    return {"chi2": chi2, "p_value": p, "independent": p > 0.05}',
        out: 'Chi-square test output with p-value',
        cap: 'Write an analytical summary explaining the relationship between TVET certification and youth employment.'
      },
      {
        title: 'Simple Linear Regression for Economic Indicator Forecasting',
        q: 'In the linear regression equation Y = β0 + β1*X + ε, what does β1 represent?',
        options: ['The value of Y when X is zero', 'The expected change in Y for every one-unit increase in X', 'The variance of the residual errors', 'The sample correlation coefficient squared'],
        correct: 1,
        exp: 'β1 is the slope coefficient, measuring the marginal effect of the explanatory variable X on outcome Y.',
        task: 'Fit a simple linear regression using statsmodels.api predicting district employment from internet penetration.',
        code: 'import statsmodels.api as sm\n\ndef model_internet_impact(df):\n    X = sm.add_constant(df["internet_pct"])\n    y = df["employment_rate"]\n    model = sm.OLS(y, X).fit()\n    return {"r_squared": model.rsquared, "params": model.params.to_dict(), "pvalues": model.pvalues.to_dict()}',
        out: 'Regression model metrics dictionary',
        cap: 'Submit a regression diagnostic report with fitted line plot and residual analysis.'
      },
      {
        title: 'Multiple Regression & Multicollinearity Diagnostics (VIF)',
        q: 'What Variance Inflation Factor (VIF) score indicates severe multicollinearity between predictor variables?',
        options: ['VIF between 0 and 1', 'VIF exactly 1.0', 'VIF greater than 5 or 10', 'Negative VIF values'],
        correct: 2,
        exp: 'A VIF above 5 (or 10 in strict models) indicates that a predictor variable is highly collinear with other predictors, inflating variance.',
        task: 'Compute the Variance Inflation Factor for each numerical feature in a macroeconomic dataset.',
        code: 'from statsmodels.stats.outliers_influence import variance_inflation_factor\n\ndef compute_vif_scores(df_features):\n    X = sm.add_constant(df_features.dropna())\n    vif_data = {}\n    for i, col in enumerate(X.columns):\n        if col != "const":\n            vif_data[col] = variance_inflation_factor(X.values, i)\n    return vif_data',
        out: 'Dictionary of feature names and VIF scores',
        cap: 'Build a multi-variable wage model eliminating redundant indicators through VIF pruning.'
      },
      {
        title: 'Exploratory Data Analysis & Summary Profiling',
        q: 'What is the most complete single method in Pandas to review count, mean, quartiles, and extremes for all numeric columns?',
        options: ['df.info()', 'df.describe()', 'df.head()', 'df.values'],
        correct: 1,
        exp: 'df.describe() generates an eight-number summary including count, mean, std, min, 25%, 50%, 75%, and max.',
        task: 'Generate an automated EDA summary dataframe that includes missing value count and percentage alongside standard stats.',
        code: 'def comprehensive_eda_profile(df):\n    desc = df.describe().T\n    desc["missing_count"] = df.isnull().sum()\n    desc["missing_pct"] = (desc["missing_count"] / len(df)) * 100\n    return desc',
        out: 'Transposed EDA profile DataFrame',
        cap: 'Submit an automated EDA notebook exploring the 2025 Rwanda Establishment Census sample.'
      },
      {
        title: 'Data Visualization with Matplotlib: Histograms & Boxplots',
        q: 'Which Matplotlib function configures clear, accessible figure dimensions and prevents label clipping in exported PNGs?',
        options: ['plt.figure(figsize=(10, 6)) followed by plt.tight_layout()', 'plt.show(full_screen=True)', 'plt.style.use("classic")', 'plt.savefig(dpi=10)'],
        correct: 0,
        exp: 'plt.figure(figsize=...) sets explicit canvas proportions while plt.tight_layout() adjusts subplot margins to avoid label overlap.',
        task: 'Write a script that creates a side-by-side histogram and boxplot for youth age distribution and saves it at 300 DPI.',
        code: 'import matplotlib.pyplot as plt\n\ndef plot_age_distribution(df, output_path="age_dist.png"):\n    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 5))\n    ax1.hist(df["age"].dropna(), bins=15, color="#2563eb", edgecolor="white")\n    ax1.set_title("Age Distribution Histogram")\n    ax2.boxplot(df["age"].dropna(), vert=False, patch_artist=True)\n    ax2.set_title("Age Boxplot")\n    plt.tight_layout()\n    plt.savefig(output_path, dpi=300)\n    plt.close()',
        out: 'Saved high-res PNG chart file',
        cap: 'Create a publication-ready figure with 4 subplots illustrating district poverty and education levels.'
      },
      {
        title: 'Advanced Visualizations with Seaborn: Pairplots & Heatmaps',
        q: 'In a Seaborn correlation heatmap, which parameter ensures exact numeric Pearson coefficients are displayed inside each cell?',
        options: ['annot=True', 'labels="all"', 'numbers=True', 'show_values=True'],
        correct: 0,
        exp: 'sns.heatmap(..., annot=True) writes the correlation coefficient value into each matrix grid cell.',
        task: 'Compute correlation matrix on numerical features and plot a clean Seaborn heatmap with blue-to-white diverging palette.',
        code: 'import seaborn as sns\n\ndef plot_correlation_matrix(df, cols):\n    corr = df[cols].corr()\n    plt.figure(figsize=(8, 6))\n    sns.heatmap(corr, annot=True, cmap="Blues", fmt=".2f", vmin=-1, vmax=1)\n    plt.title("Economic Indicator Correlation Heatmap")\n    plt.tight_layout()',
        out: 'Seaborn heatmap visualization object',
        cap: 'Design an interactive exploratory dashboard chart analyzing inter-sectoral employment correlations.'
      },
      {
        title: 'Relational Schema Normalization (1NF, 2NF, 3NF)',
        q: 'A table satisfies Third Normal Form (3NF) if and only if it is in 2NF and what additional condition is met?',
        options: ['All foreign keys point to cloud databases', 'There are no transitive functional dependencies between non-key attributes', 'All text values are stored as JSONB', 'The table has fewer than 10 columns'],
        correct: 1,
        exp: '3NF requires that every non-key attribute must depend on "the key, the whole key, and nothing but the key" (no transitive dependencies).',
        task: 'Decompose a non-normalized survey spreadsheet with repeated district names into 3NF normalized tables: Districts and Respondents.',
        code: '-- DDL for 3NF Decomposition\nCREATE TABLE districts (\n  district_code VARCHAR(10) PRIMARY KEY,\n  district_name VARCHAR(50) NOT NULL,\n  province_name VARCHAR(50) NOT NULL\n);\n\nCREATE TABLE respondents (\n  respondent_id BIGSERIAL PRIMARY KEY,\n  district_code VARCHAR(10) REFERENCES districts(district_code),\n  age INT CHECK (age >= 16),\n  employed BOOLEAN NOT NULL\n);',
        out: 'Normalized DDL schema script',
        cap: 'Provide a schema normalization audit document converting a legacy spreadsheet into 3NF PostgreSQL tables.'
      },
      {
        title: 'SQL Fundamentals: SELECT, WHERE, ORDER BY, LIMIT',
        q: 'What is the logical order of operations in SQL execution for a query with SELECT, WHERE, FROM, and ORDER BY?',
        options: ['SELECT → FROM → WHERE → ORDER BY', 'FROM → WHERE → SELECT → ORDER BY', 'WHERE → FROM → SELECT → ORDER BY', 'ORDER BY → FROM → WHERE → SELECT'],
        correct: 1,
        exp: 'The query processor first loads rows (FROM), filters them (WHERE), projects requested columns (SELECT), and finally sorts (ORDER BY).',
        task: 'Write a query to retrieve top 5 districts in "Eastern Province" by youth population sorted in descending order.',
        code: 'SELECT district_name, youth_population\nFROM districts\nWHERE province = \'Eastern Province\'\nORDER BY youth_population DESC\nLIMIT 5;',
        out: 'Top 5 Eastern districts by youth count',
        cap: 'Submit a suite of 5 fundamental SQL queries extracting demographic segments for district mayors.'
      },
      {
        title: 'Aggregate Functions: COUNT, SUM, AVG, MIN, MAX',
        q: 'How does COUNT(*) differ from COUNT(column_name) in PostgreSQL?',
        options: ['They are identical in all cases', 'COUNT(*) counts all rows including NULLs, whereas COUNT(column_name) only counts non-NULL values in that column', 'COUNT(*) only works on primary keys', 'COUNT(column_name) is twice as fast'],
        correct: 1,
        exp: 'COUNT(*) evaluates the entire row count, while COUNT(column) ignores rows where column IS NULL.',
        task: 'Write a SQL query calculating total workforce, average monthly wage, and total employed count grouped by sector.',
        code: 'SELECT sector_name, \n       COUNT(*) AS total_workers, \n       AVG(monthly_wage) AS avg_wage, \n       SUM(CASE WHEN is_employed THEN 1 ELSE 0 END) AS employed_count\nFROM labour_census\nGROUP BY sector_name;',
        out: 'Workforce aggregation table by sector',
        cap: 'Build a SQL analytical summary calculating national sector totals for the NISR Annual Digest.'
      },
      {
        title: 'SQL Multi-Table Joins: INNER, LEFT, RIGHT, FULL OUTER',
        q: 'In which scenario will an INNER JOIN between courses and enrollments produce fewer rows than a LEFT JOIN?',
        options: ['Never, both produce identical row counts', 'When there are courses that have zero enrolled students', 'When every student is enrolled in every course', 'When foreign keys are disabled in PostgreSQL'],
        correct: 1,
        exp: 'An INNER JOIN drops courses with zero matching enrollment records, while LEFT JOIN preserves all courses with NULL enrollment values.',
        task: 'Write a query using LEFT JOIN to list all courses alongside their total enrollment count, displaying 0 for courses with no enrollees.',
        code: 'SELECT c.id, c.title, COALESCE(COUNT(e.user_id), 0) AS total_enrolled\nFROM courses c\nLEFT JOIN user_enrollments e ON c.id = e.course_id\nGROUP BY c.id, c.title\nORDER BY total_enrolled DESC;',
        out: 'Complete course catalog with enrollment metrics',
        cap: 'Write a multi-table report joining learners, courses, assessments, and certifications in one SQL view.'
      },
      {
        title: 'Subqueries: Correlated and Non-Correlated in WHERE & FROM',
        q: 'What distinguishes a correlated subquery from a standard non-correlated subquery?',
        options: ['A correlated subquery executes only once for the entire query', 'A correlated subquery references columns from the outer query and re-evaluates for every outer row', 'A correlated subquery cannot return scalar numbers', 'Correlated subqueries only work in MySQL'],
        correct: 1,
        exp: 'Correlated subqueries depend on values from the current row of the outer table, executing repeatedly for each row evaluated.',
        task: 'Write a query using a correlated subquery to find districts where the employment rate exceeds their province\'s average employment rate.',
        code: 'SELECT d1.district_name, d1.province, d1.employment_rate\nFROM districts d1\nWHERE d1.employment_rate > (\n    SELECT AVG(d2.employment_rate)\n    FROM districts d2\n    WHERE d2.province = d1.province\n);',
        out: 'Districts performing above provincial average',
        cap: 'Design a subquery portfolio comparing individual learner scores against cohort benchmarks.'
      },
      {
        title: 'SQL Window Functions: ROW_NUMBER, RANK, DENSE_RANK',
        q: 'If two students tie for the top score of 98%, what ranks will DENSE_RANK() assign to the tied students and the next student with 95%?',
        options: ['1, 1, 3', '1, 1, 2', '1, 2, 3', '1, 2, 2'],
        correct: 1,
        exp: 'DENSE_RANK assigns identical ranks (1, 1) to ties and does NOT skip ranks, so the next score receives rank 2 (unlike RANK which skips to 3).',
        task: 'Write a window function query ranking learners by assessment score within each district using DENSE_RANK.',
        code: 'SELECT user_id, district, score,\n       DENSE_RANK() OVER (PARTITION BY district ORDER BY score DESC) as district_rank\nFROM user_skills\nWHERE skill_id = \'sk-1\';',
        out: 'Ranked learner list partitioned by district',
        cap: 'Submit a SQL script generating top-3 student leaderboards for each of the 30 Rwandan districts.'
      },
      {
        title: 'Window Aggregations: Running Totals & Moving Averages',
        q: 'Which window frame clause computes a 3-month moving average of revenue including the current month and the two preceding months?',
        options: ['ROWS BETWEEN 2 PRECEDING AND CURRENT ROW', 'RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW', 'ROWS 3 PRECEDING', 'PARTITION BY 3 MONTHS'],
        correct: 0,
        exp: 'ROWS BETWEEN 2 PRECEDING AND CURRENT ROW defines a rolling window of exactly 3 rows (2 prior + current).',
        task: 'Write a SQL query calculating monthly revenue alongside a running cumulative total across the fiscal year.',
        code: 'SELECT month_name, monthly_revenue,\n       SUM(monthly_revenue) OVER (ORDER BY month_index ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS cumulative_revenue\nFROM cooperative_revenue\nORDER BY month_index;',
        out: 'Monthly records with cumulative totals',
        cap: 'Construct a rolling 7-day active user metric for The Hub platform using SQL window frames.'
      },
      {
        title: 'Common Table Expressions (CTEs) & Recursive Queries',
        q: 'Why are Common Table Expressions (WITH clauses) preferred over deeply nested subqueries in production analytics?',
        options: ['CTEs bypass database access security rules', 'CTEs improve code modularity, readability, and can be referenced multiple times within the same execution plan', 'CTEs always convert queries to NoSQL', 'Nested subqueries cannot use WHERE clauses'],
        correct: 1,
        exp: 'CTEs provide named, readable temporary result sets that break complex logic into intuitive sequential steps.',
        task: 'Write a query using two sequential CTEs to find provinces where youth unemployment exceeds the national median.',
        code: 'WITH NationalMedian AS (\n    SELECT PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY youth_unemployment_rate) AS med_rate\n    FROM provincial_stats\n),\nProvincialComparison AS (\n    SELECT p.province_name, p.youth_unemployment_rate, m.med_rate\n    FROM provincial_stats p, NationalMedian m\n)\nSELECT province_name, youth_unemployment_rate\nFROM ProvincialComparison\nWHERE youth_unemployment_rate > med_rate;',
        out: 'List of high-unemployment provinces',
        cap: 'Implement a multi-step CTE calculating learner retention rates across 4 sequential course modules.'
      },
      {
        title: 'Database Views & Materialized Views for Macro Reporting',
        q: 'What is the primary difference between a standard VIEW and a MATERIALIZED VIEW in PostgreSQL?',
        options: ['A standard view stores data on disk; materialized view is virtual', 'A standard view re-executes the underlying query on demand; a materialized view caches the query results physically on disk until refreshed', 'Materialized views cannot use indexes', 'Standard views only support integer columns'],
        correct: 1,
        exp: 'Materialized views persist computed query results on disk, delivering instant read performance for expensive analytical aggregations.',
        task: 'Create a materialized view for national skill benchmarks that can be refreshed concurrently.',
        code: 'CREATE MATERIALIZED VIEW mv_district_skill_benchmarks AS\nSELECT district_id, \n       AVG(score) AS avg_competency_score,\n       COUNT(*) AS total_assessments_taken\nFROM user_skills\nGROUP BY district_id;\n\nCREATE UNIQUE INDEX idx_mv_district ON mv_district_skill_benchmarks (district_id);',
        out: 'Materialized view with unique index',
        cap: 'Submit a DDL migration creating 3 analytical views supporting the NISR executive dashboard.'
      },
      {
        title: 'SQL Performance Tuning: EXPLAIN ANALYZE & B-Tree Indexing',
        q: 'When reviewing an EXPLAIN ANALYZE output in PostgreSQL, what indicates that an index is effectively accelerating a WHERE filter?',
        options: ['Seq Scan on table_name (cost=0.00..8450.00)', 'Index Scan or Bitmap Index Scan using idx_name with significantly reduced execution time', 'Hash Join with memory spill to disk', 'Sort Method: external merge Disk'],
        correct: 1,
        exp: 'An Index Scan replaces a full sequential table scan (Seq Scan), jumping directly to matching index leaves.',
        task: 'Create a composite B-Tree index on table user_enrollments for (course_id, enrolled_at) and write query to verify index usage.',
        code: 'CREATE INDEX idx_enrollments_course_date ON user_enrollments (course_id, enrolled_at);\n\nEXPLAIN ANALYZE\nSELECT user_id, progress_percentage\nFROM user_enrollments\nWHERE course_id = \'c-1\' AND enrolled_at >= \'2025-01-01\';',
        out: 'EXPLAIN execution plan using Index Scan',
        cap: 'Deliver a query tuning report reducing an expensive survey join execution time from 450ms to under 15ms.'
      },
      {
        title: 'End-to-End Capstone: Rwanda 30-District Economic Intelligence Pipeline',
        q: 'In an end-to-end data pipeline, what is the correct architectural order of operations from raw survey data to verified decision support?',
        options: ['Visualization → SQL Modeling → Raw Ingestion → Cleaning', 'Ingestion & Validation → Cleaning & Imputation → Normalization & SQL Aggregation → Statistical Modeling & Verified Dashboard', 'Random Sampling → Reporting → Archiving', 'Manual Excel formulas only'],
        correct: 1,
        exp: 'Sound analytics pipelines follow systematic ETL: Ingest, Validate/Clean, Normalize in SQL, Model statistically, and visualize.',
        task: 'Write an end-to-end analytical pipeline function that reads district data, calculates composite readiness, and produces a ranked policy table.',
        code: 'def execute_district_intelligence_pipeline(survey_path, output_csv="ranked_districts.csv"):\n    df = pd.read_csv(survey_path)\n    df["composite_score"] = (df["employment_rate"] * 0.4) + (df["internet_access"] * 0.3) + (df["tvet_graduates"] * 0.3)\n    ranked = df.sort_values(by="composite_score", ascending=False).reset_index(drop=True)\n    ranked["national_rank"] = ranked.index + 1\n    ranked.to_csv(output_csv, index=False)\n    return ranked[["district_name", "national_rank", "composite_score"]].head(5)',
        out: 'Top 5 ranked districts summary',
        cap: 'Publish a complete GitHub repository containing Python scripts, SQL views, and a 3-page NISR policy brief analyzing all 30 Rwandan districts.'
      }
    ]
  },
  {
    courseId: 'c-2',
    courseName: 'Full-Stack Web Development: Fast & Low-Bandwidth',
    skillTarget: 'React, Node.js & Low-Bandwidth Architecture',
    topics: [
      {
        title: 'Component Hierarchy & Pure Functional React Components',
        q: 'What is a "pure component" in React, and why is purity essential for predictable UI rendering?',
        options: ['A component that does not use Tailwind CSS', 'A component that returns identical JSX for the same props and state without causing observable side effects during render', 'A component written in TypeScript only', 'A component with zero HTML elements'],
        correct: 1,
        exp: 'Pure components are deterministic: given the same inputs (props and state), they return the same JSX and produce no side effects during the render phase.',
        task: 'Refactor an impure component that modified window.counter during render into a pure functional component with props.',
        code: 'export default function CourseBadge({ title, category, count }) {\n  return (\n    <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">\n      <span>{title}</span>\n      <span className="text-slate-400">({count})</span>\n    </div>\n  );\n}',
        out: 'Clean, pure functional React component',
        cap: 'Build a component library of 5 pure atomic UI widgets adhering to zero-side-effect standards.'
      },
      {
        title: 'Props Validation, Destructuring, and Default Values',
        q: 'In modern React, what is the cleanest approach to supply fallback default values for optional component props?',
        options: ['Using default parameter syntax in JavaScript function destructuring: function Button({ variant = "primary" })', 'Writing global switch statements in index.html', 'Mutating the props object directly inside the component body', 'Props cannot have default values in React 19'],
        correct: 0,
        exp: 'ES6 object destructuring with default parameters provides concise, type-safe fallbacks without mutating incoming props.',
        task: 'Implement a CardHeader component with destructured props title, subtitle, and an optional badge defaulting to "New".',
        code: 'export default function CardHeader({ title, subtitle, badge = "New" }) {\n  return (\n    <div className="flex items-center justify-between pb-3 border-b border-slate-100">\n      <div>\n        <h3 className="font-bold text-slate-900 text-sm">{title}</h3>\n        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}\n      </div>\n      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">{badge}</span>\n    </div>\n  );\n}',
        out: 'CardHeader component with clean defaults',
        cap: 'Audit a 10-component frontend codebase eliminating all missing prop warnings and runtime undefined errors.'
      },
      {
        title: 'State Management with useState and Controlled Form Inputs',
        q: 'Why should form inputs in React be "controlled" components where value is tied to state and updated via onChange?',
        options: ['Controlled components load faster on 2G connections', 'State serves as the single source of truth, enabling immediate validation, conditional enabling, and programmatic resets', 'Uncontrolled components cannot submit JSON', 'Browsers automatically disable uncontrolled inputs in 2026'],
        correct: 1,
        exp: 'Controlled components ensure the React state is always synchronized with the DOM input value, enabling validation and consistent UI state.',
        task: 'Create a controlled email input with inline regex validation that displays an error message if the domain is invalid.',
        code: 'import React, { useState } from "react";\n\nexport function EmailField({ onValidEmail }) {\n  const [email, setEmail] = useState("");\n  const [error, setError] = useState(null);\n  const validate = (val) => {\n    setEmail(val);\n    if (val && !/^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/.test(val)) {\n      setError("Please provide a valid email format");\n    } else { setError(null); onValidEmail(val); }\n  };\n  return (\n    <div>\n      <input type="email" value={email} onChange={(e) => validate(e.target.value)} className="border p-2 rounded text-xs w-full" />\n      {error && <span className="text-red-600 text-xs">{error}</span>}\n    </div>\n  );\n}',
        out: 'Controlled email input with real-time feedback',
        cap: 'Build a multi-field registration form with client-side validation and optimistic submission UI.'
      },
      {
        title: 'Side Effects & Dependency Arrays with useEffect',
        q: 'What occurs if an object or function created inside a component is added to a useEffect dependency array without useMemo or useCallback?',
        options: ['React throws a compile error immediately', 'The effect will re-execute on every single render because objects/functions have new memory references each render', 'The effect executes only once upon component mount', 'The browser memory is automatically cleared'],
        correct: 1,
        exp: 'In JavaScript, new object/function literals receive a new reference on each render; React detects a reference change and re-runs the effect indefinitely.',
        task: 'Refactor an effect that fetches course details so that it safely responds to parameter changes and cleans up pending requests.',
        code: 'useEffect(() => {\n  let isMounted = true;\n  async function fetchDetails() {\n    const res = await api.getCourseBySlug(slug);\n    if (isMounted && res.success) setCourse(res.data);\n  }\n  fetchDetails();\n  return () => { isMounted = false; };\n}, [slug]);',
        out: 'Safe effect with cleanup flag',
        cap: 'Refactor 3 async components to eliminate memory leaks and race conditions on unmounted views.'
      },
      {
        title: 'Custom Hooks: Creating a Resilient Online/Offline Status Hook',
        q: 'Which browser events should a custom hook subscribe to in order to detect real-time internet connectivity changes?',
        options: ['window.onscroll and window.onresize', 'window.addEventListener("online") and window.addEventListener("offline")', 'document.onkeypress', 'navigator.serviceWorker.onmessage only'],
        correct: 1,
        exp: 'The window "online" and "offline" events fire immediately when the browser detects physical connectivity state transitions.',
        task: 'Implement a production-grade useNetworkStatus() custom hook that returns boolean isOnline and lastChanged timestamp.',
        code: 'import { useState, useEffect } from "react";\n\nexport function useNetworkStatus() {\n  const [isOnline, setIsOnline] = useState(typeof navigator !== "undefined" ? navigator.onLine : true);\n  useEffect(() => {\n    const handleOnline = () => setIsOnline(true);\n    const handleOffline = () => setIsOnline(false);\n    window.addEventListener("online", handleOnline);\n    window.addEventListener("offline", handleOffline);\n    return () => {\n      window.removeEventListener("online", handleOnline);\n      window.removeEventListener("offline", handleOffline);\n    };\n  }, []);\n  return isOnline;\n}',
        out: 'useNetworkStatus hook returning boolean',
        cap: 'Integrate the network status hook with a non-intrusive offline notification banner across all application views.'
      },
      {
        title: 'Performance Optimization with useMemo and useCallback',
        q: 'When is it appropriate to wrap an expensive calculation inside useMemo?',
        options: ['On every single primitive variable in the component', 'Only when the computation is CPU-intensive (e.g. filtering 10,000 items) and depends on specific state/prop changes', 'To make network fetch requests faster', 'To replace CSS styles'],
        correct: 1,
        exp: 'useMemo caches computation results between renders; using it for trivial operations adds unnecessary memory and comparison overhead.',
        task: 'Use useMemo to filter and compute category statistics across an array of 5,000 course enrollments.',
        code: 'const categoryStats = useMemo(() => {\n  const counts = {};\n  courses.forEach(c => { counts[c.category] = (counts[c.category] || 0) + 1; });\n  return counts;\n}, [courses]);',
        out: 'Memoized category tally object',
        cap: 'Audit React DevTools Profiler traces, reducing unnecessary re-renders in a complex course catalog by 70%.'
      },
      {
        title: 'Global State Management with Context API & Reducers',
        q: 'Why should useReducer be combined with React Context for complex application state rather than multiple disjoint useStates?',
        options: ['Context requires reducers to compile in Vite', 'useReducer centralizes state transitions in predictable action handlers, making complex multi-step updates atomic and debuggable', 'useReducer stores state permanently in the database', 'useReducer eliminates the virtual DOM'],
        correct: 1,
        exp: 'useReducer provides predictable state transitions via dispatched actions, avoiding scattered state-update logic across deeply nested components.',
        task: 'Write an authReducer function handling actions "LOGIN_SUCCESS", "LOGOUT", and "UPDATE_STREAK".',
        code: 'export function authReducer(state, action) {\n  switch (action.type) {\n    case "LOGIN_SUCCESS": return { ...state, user: action.payload, isAuth: true };\n    case "LOGOUT": return { ...state, user: null, isAuth: false };\n    case "UPDATE_STREAK": return { ...state, user: { ...state.user, streakDays: action.payload } };\n    default: return state;\n  }\n}',
        out: 'Pure reducer function handling auth actions',
        cap: 'Implement an end-to-end CourseCartContext with reducer supporting offline enrollment queues.'
      },
      {
        title: 'Routing & Dynamic Route Parameters in React Router',
        q: 'In React Router v6/v7, how do you capture a dynamic course slug from a URL like /courses/:slug?',
        options: ['window.location.search', 'const { slug } = useParams(); from "react-router-dom"', 'const slug = useRouteMatch().query', 'props.match.params.slug only'],
        correct: 1,
        exp: 'The useParams() hook extracts route parameters defined with colon syntax in the Route path element.',
        task: 'Set up a Route component for "/courses/:slug" rendering CourseDetail, extracting slug safely.',
        code: 'import { useParams } from "react-router-dom";\n\nexport function CourseDetailPage() {\n  const { slug } = useParams();\n  return <div>Loading course details for: {slug}</div>;\n}',
        out: 'Dynamic course parameter component',
        cap: 'Configure a nested routing architecture supporting tabs for Overview, Syllabus, and Assessments.'
      },
      {
        title: 'Accessible Form Controls and Semantic HTML Structure',
        q: 'Why are semantic HTML tags (<main>, <header>, <nav>, <section>) superior to generic <div> tags for accessibility (a11y)?',
        options: ['Semantic tags download faster from CDN servers', 'Screen readers and assistive technologies use semantic landmarks to allow visually impaired users to navigate pages efficiently', 'Semantic tags prevent cross-site scripting (XSS)', 'Browsers render semantic tags in bold font by default'],
        correct: 1,
        exp: 'Semantic landmarks expose document structure to screen readers and keyboard users, satisfying WCAG 2.1 AA accessibility standards.',
        task: 'Refactor a form with div tags into an accessible form with labeled inputs, fieldsets, and aria-describedby hints.',
        code: '<form onSubmit={handleSubmit} aria-labelledby="form-title">\n  <h2 id="form-title" className="text-base font-bold">Submit Assignment</h2>\n  <label htmlFor="repo-url" className="block text-xs font-semibold">Repository URL</label>\n  <input id="repo-url" type="url" aria-describedby="url-hint" required className="border p-2 rounded" />\n  <span id="url-hint" className="text-[11px] text-slate-500">Provide a public GitHub link.</span>\n</form>',
        out: 'Accessible form satisfying WCAG landmarks',
        cap: 'Run an axe-core accessibility audit on the application achieving zero critical accessibility violations.'
      },
      {
        title: 'Tailwind CSS Responsive Grid & Flexbox Layouts',
        q: 'In Tailwind CSS mobile-first design, what screen sizes do classes with the md: prefix target?',
        options: ['Only screens smaller than 768px', 'Screens 768px wide and above (tablets, laptops, desktops)', 'Only medium-density mobile screens', 'Android devices specifically'],
        correct: 1,
        exp: 'Tailwind is mobile-first: unprefixed classes apply to all screens; md: applies min-width: 768px and continues up unless overridden by lg:.',
        task: 'Write a responsive grid container that renders 1 column on mobile, 2 columns on tablets (md:), and 3 columns on desktops (lg:).',
        code: '<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">\n  {items.map(item => <div key={item.id} className="p-4 bg-white border rounded-xl">{item.title}</div>)}\n</div>',
        out: 'Responsive 1/2/3 column layout',
        cap: 'Design a responsive dashboard header that gracefully collapses from desktop navigation to mobile drawer.'
      },
      {
        title: 'Express Server Initialization & Middleware Architecture',
        q: 'In an Express application, why is the ordering of middleware declarations critical?',
        options: ['Middleware executes in random parallel order', 'Express executes middleware sequentially in the exact order they are registered with app.use()', 'Middleware must always be declared in alphabetical order', 'Only routers have execution order'],
        correct: 1,
        exp: 'Express processes HTTP requests down an internal middleware pipeline in registration order; body parsers must precede route handlers.',
        task: 'Initialize an Express server mounting express.json(), a security logger, and error-handling middleware.',
        code: 'import express from "express";\nconst app = express();\n\napp.use(express.json());\napp.use((req, res, next) => {\n  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);\n  next();\n});\n// Routes here\napp.use((err, req, res, next) => {\n  res.status(500).json({ success: false, error: err.message });\n});',
        out: 'Express app with sequential middleware chain',
        cap: 'Structure a modular full-stack Express API with router sub-modules and global error handlers.'
      },
      {
        title: 'RESTful Endpoint Design & HTTP Status Code Semantics',
        q: 'What is the most appropriate HTTP status code to return when a client successfully creates a new course enrollment?',
        options: ['200 OK', '201 Created', '204 No Content', '304 Not Modified'],
        correct: 1,
        exp: 'HTTP 201 Created is the standard status code indicating that a resource was successfully created on the server.',
        task: 'Create an Express route POST /api/courses/:id/enroll that returns 201 on success or 400 if already enrolled.',
        code: 'router.post("/courses/:id/enroll", (req, res) => {\n  const { id } = req.params;\n  if (user.enrolledCourses.includes(id)) {\n    return res.status(400).json({ success: false, error: "Already enrolled" });\n  }\n  user.enrolledCourses.push(id);\n  res.status(201).json({ success: true, message: "Enrolled successfully", courseId: id });\n});',
        out: 'RESTful endpoint returning 201 Created',
        cap: 'Audit all API endpoints to guarantee strict compliance with RESTful HTTP verb and status code standards.'
      },
      {
        title: 'Request Body Parsing and Schema Validation',
        q: 'Why should backend APIs always validate request payloads on the server even if client-side validation exists?',
        options: ['Client validation makes backend validation redundant', 'Client validation can be trivially bypassed by inspecting tools, curl, or automated bots, exposing servers to malformed data', 'Server validation is only needed for XML data', 'Database engines automatically reject invalid formats'],
        correct: 1,
        exp: 'Client validation provides user convenience; server validation is the non-negotiable security boundary preventing corrupted data.',
        task: 'Write a validation middleware that confirms req.body contains valid names, email, and password strings before proceeding.',
        code: 'function validateRegistration(req, res, next) {\n  const { names, email, password } = req.body || {};\n  if (!names || names.trim().length < 2) return res.status(400).json({ error: "Invalid name" });\n  if (!email || !email.includes("@")) return res.status(400).json({ error: "Invalid email" });\n  if (!password || password.length < 8) return res.status(400).json({ error: "Password must be >= 8 chars" });\n  next();\n}',
        out: 'Validation middleware rejecting malformed payloads',
        cap: 'Implement validation middleware using Zod or custom defensive guards across all POST endpoints.'
      },
      {
        title: 'Error Handling Middleware & Graceful Server Shutdown',
        q: 'What signature must an Express error-handling middleware have to be recognized by the runtime engine?',
        options: ['(req, res, next)', '(err, req, res)', '(err, req, res, next) - exactly four arguments', 'function handleError()'],
        correct: 2,
        exp: 'Express checks function.length === 4; declaring exactly four arguments signals to the router that this is an error handler.',
        task: 'Implement a global error handler that returns sanitized error messages in production while masking stack traces.',
        code: 'app.use((err, req, res, next) => {\n  console.error("[Unhandled Exception]", err);\n  const isProd = process.env.NODE_ENV === "production";\n  res.status(err.status || 500).json({\n    success: false,\n    error: isProd ? "Internal Server Error" : err.message\n  });\n});',
        out: 'Sanitized error response middleware',
        cap: 'Configure graceful termination handling for SIGTERM and SIGINT closing database pools safely.'
      },
      {
        title: 'Asynchronous Operations & Promise.all Error Isolation',
        q: 'What is the risk of using Promise.all() when fetching multiple independent third-party data services?',
        options: ['It runs sequentially instead of parallel', 'If any single promise rejects, Promise.all immediately rejects the entire batch, losing successful results from other promises', 'It can only fetch up to 3 endpoints', 'It causes memory leaks in V8'],
        correct: 1,
        exp: 'Promise.all fails fast on the first rejection; using Promise.allSettled() preserves successful responses even if one fails.',
        task: 'Refactor parallel API calls to use Promise.allSettled() so one offline endpoint does not crash the entire dashboard.',
        code: 'async function loadDashboardTelemetry() {\n  const results = await Promise.allSettled([\n    api.getCourses(),\n    api.getNisrIndicators(),\n    api.getNisrLabourSummary()\n  ]);\n  return results.map(r => r.status === "fulfilled" ? r.value : null);\n}',
        out: 'Resilient parallel loader with allSettled',
        cap: 'Build a resilient multi-source data ingestion pipeline with automated retry and fallback providers.'
      },
      {
        title: 'JWT Authentication & Bearer Header Token Validation',
        q: 'Where should a client include a JSON Web Token (JWT) when making authenticated API requests?',
        options: ['In the URL query string: ?token=...', 'In the Authorization header formatted as: Bearer <token>', 'In the User-Agent header', 'In HTML meta tags'],
        correct: 1,
        exp: 'Standard RFC 6750 specifies passing bearer credentials via the "Authorization: Bearer <token>" HTTP header.',
        task: 'Write an Express auth middleware verifying the Bearer token from the Authorization header.',
        code: 'function requireAuthToken(req, res, next) {\n  const authHeader = req.headers.authorization;\n  if (!authHeader || !authHeader.startsWith("Bearer ")) {\n    return res.status(401).json({ success: false, error: "Missing Bearer token" });\n  }\n  const token = authHeader.split(" ")[1];\n  if (token === "valid-session-token") { next(); } else {\n    res.status(403).json({ success: false, error: "Invalid token" });\n  }\n}',
        out: 'Bearer token verification middleware',
        cap: 'Implement complete stateless token authentication with refresh tokens and role-based permissions.'
      },
      {
        title: 'Password Hashing with Bcrypt & Salt Rounds',
        q: 'Why should passwords NEVER be stored in plain text or with simple MD5 / SHA-256 hashes?',
        options: ['Plaintext takes up more database bytes', 'MD5 and simple SHA hashes are vulnerable to rainbow table attacks and GPU brute-force cracking; bcrypt incorporates salt and adaptive work factors', 'Database engines crash on plain passwords', 'Browsers refuse to send plain text'],
        correct: 1,
        exp: 'Bcrypt uses key-derivation algorithms with salting and tunable cost factors to make brute-force attacks computationally infeasible.',
        task: 'Write a password verification function using bcryptjs that hashes a password with 10 salt rounds.',
        code: 'import bcrypt from "bcryptjs";\n\nexport async function hashUserPassword(plainPassword) {\n  const salt = await bcrypt.genSalt(10);\n  return bcrypt.hash(plainPassword, salt);\n}\nexport async function verifyUserPassword(plain, hashed) {\n  return bcrypt.compare(plain, hashed);\n}',
        out: 'Bcrypt hashing and comparison helper',
        cap: 'Implement secure account registration with salted password hashing and credential update auditing.'
      },
      {
        title: 'Rate Limiting and DoS Protection Middleware',
        q: 'What is the purpose of implementing rate limiting on authentication routes like /api/auth/login?',
        options: ['To speed up database index searches', 'To prevent brute-force credential stuffing and denial-of-service attacks by capping request volume per IP', 'To restrict users to 1 login per day', 'To prevent users from using Google Chrome'],
        correct: 1,
        exp: 'Rate limiting limits the number of requests an IP can issue within a time window, blocking brute-force automated login bots.',
        task: 'Write an in-memory rate-limiter middleware allowing at most 5 login attempts per IP every 15 minutes.',
        code: 'const loginAttempts = new Map();\n\nfunction rateLimitLogin(req, res, next) {\n  const ip = req.ip || "unknown";\n  const now = Date.now();\n  const record = loginAttempts.get(ip) || { count: 0, resetTime: now + 15 * 60000 };\n  if (now > record.resetTime) { record.count = 0; record.resetTime = now + 15 * 60000; }\n  record.count++;\n  loginAttempts.set(ip, record);\n  if (record.count > 5) return res.status(429).json({ error: "Too many attempts. Try again in 15 mins." });\n  next();\n}',
        out: 'In-memory sliding window rate limiter',
        cap: 'Configure a security policy with IP-based rate limiting, request size limits, and security headers.'
      },
      {
        title: 'CORS Configuration & Security Headers with Helmet',
        q: 'What security risk does Cross-Origin Resource Sharing (CORS) protect against when properly restricted?',
        options: ['It prevents servers from running out of disk space', 'It blocks unauthorized external domains from making authenticated browser requests that steal user session data', 'It stops mobile phones from accessing the site', 'It forces all users to use HTTPS'],
        correct: 1,
        exp: 'CORS instructs the browser which origins are authorized to read cross-origin responses, preventing unauthorized third-party scripts from reading private data.',
        task: 'Configure CORS options in Express to allow only authorized origins and necessary methods (GET, POST, PUT, DELETE).',
        code: 'import cors from "cors";\n\nconst allowedOrigins = ["https://thehub.rw", "http://localhost:3000"];\nexport const secureCors = cors({\n  origin: (origin, callback) => {\n    if (!origin || allowedOrigins.includes(origin)) callback(null, true);\n    else callback(new Error("CORS policy violation"));\n  },\n  methods: ["GET", "POST", "PUT", "DELETE"],\n  credentials: true\n});',
        out: 'Restricted CORS configuration middleware',
        cap: 'Deploy Helmet security headers configuring Content-Security-Policy (CSP) and X-Frame-Options.'
      },
      {
        title: 'PostgreSQL Connection Pooling with pg / Drizzle',
        q: 'Why should production web services use a database connection pool rather than opening a new TCP connection on every request?',
        options: ['Opening new database connections incurs TLS handshakes and socket overhead that quickly exhaust database process limits under load', 'PostgreSQL only permits exactly one connection at a time', 'Connection pools reduce database disk usage', 'Pools allow running SQL queries without passwords'],
        correct: 0,
        exp: 'Connection pooling maintains a warm set of reusable database connections, minimizing connection latency and preventing server exhaustion.',
        task: 'Initialize a PostgreSQL Pool with maximum 20 connections, idle timeout 30s, and connection error monitoring.',
        code: 'import pg from "pg";\nconst { Pool } = pg;\n\nexport const dbPool = new Pool({\n  connectionString: process.env.DATABASE_URL,\n  max: 20,\n  idleTimeoutMillis: 30000,\n  connectionTimeoutMillis: 2000\n});\ndbPool.on("error", (err) => console.error("[DB Pool Error]", err));',
        out: 'PostgreSQL Pool configuration instance',
        cap: 'Perform a load test comparing direct connections vs pooled connections under 100 concurrent requests.'
      },
      {
        title: 'CRUD Database Transactions with ACID Guarantees',
        q: 'Why must user balance deduction and credential issuance be executed inside a single database TRANSACTION (BEGIN ... COMMIT)?',
        options: ['Transactions make SQL queries run twice as fast', 'To guarantee Atomicity: if the system crashes midway, the entire operation rolls back, preventing inconsistent states', 'Transactions disable database logging', 'Transactions are mandatory for SELECT queries'],
        correct: 1,
        exp: 'ACID transactions guarantee atomicity: all operations succeed together, or if any failure occurs, all changes roll back completely.',
        task: 'Write a transaction using a PostgreSQL client executing BEGIN, inserting a credential, updating the profile, and COMMIT.',
        code: 'async function awardCredentialTx(client, userId, credData) {\n  try {\n    await client.query("BEGIN");\n    await client.query("INSERT INTO credentials (id, user_id, title) VALUES ($1, $2, $3)", [credData.id, userId, credData.title]);\n    await client.query("UPDATE profiles SET streak_days = streak_days + 1 WHERE id = $1", [userId]);\n    await client.query("COMMIT");\n    return true;\n  } catch (err) {\n    await client.query("ROLLBACK");\n    throw err;\n  }\n}',
        out: 'Atomic ACID transaction implementation',
        cap: 'Build a bulletproof enrollment transaction ensuring seats cannot be oversubscribed under race conditions.'
      },
      {
        title: 'Database Migrations and Foreign Key Constraint Enforcement',
        q: 'What is the purpose of ON DELETE CASCADE in a foreign key constraint like user_enrollments(user_id) REFERENCES profiles(id)?',
        options: ['It prevents profiles from ever being deleted', 'When a profile record is deleted, all corresponding user_enrollments are automatically removed by the database engine', 'It makes the foreign key nullable', 'It deletes the entire database table on error'],
        correct: 1,
        exp: 'ON DELETE CASCADE instructs the database to automatically delete dependent child rows when the referenced parent record is deleted.',
        task: 'Write SQL migration creating table user_progress with foreign keys enforcing ON DELETE CASCADE on user_id and course_id.',
        code: 'CREATE TABLE IF NOT EXISTS user_progress (\n  user_id TEXT REFERENCES profiles(id) ON DELETE CASCADE,\n  course_id TEXT REFERENCES courses(id) ON DELETE CASCADE,\n  completed_lessons TEXT[] DEFAULT ARRAY[]::TEXT[],\n  last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,\n  PRIMARY KEY (user_id, course_id)\n);',
        out: 'DDL migration with cascade constraints',
        cap: 'Create a versioned migration pipeline tracking up/down migrations for the entire relational schema.'
      },
      {
        title: 'Service Worker Registration & Lifecycle Management',
        q: 'When does a newly installed Service Worker take control of the page if self.skipWaiting() is NOT called?',
        options: ['Immediately upon download', 'Only after all open browser tabs running the old service worker are closed and navigated anew', 'Never, it requires a browser restart', 'Service workers only run in private windows'],
        correct: 1,
        exp: 'The new worker enters a "waiting" state until all current clients (tabs) are closed, ensuring backward compatibility unless skipWaiting is invoked.',
        task: 'Write a service worker registration script in React that detects updates and alerts the user to refresh.',
        code: 'export function registerSW() {\n  if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {\n    window.addEventListener("load", () => {\n      navigator.serviceWorker.register("/sw.js").then(reg => {\n        reg.onupdatefound = () => {\n          const installingWorker = reg.installing;\n          installingWorker.onstatechange = () => {\n            if (installingWorker.state === "installed" && navigator.serviceWorker.controller) {\n              console.log("New content available; please refresh.");\n            }\n          };\n        };\n      });\n    });\n  }\n}',
        out: 'Lifecycle-aware service worker registration',
        cap: 'Deploy a production service worker with skipWaiting and clients.claim() for instant PWA updates.'
      },
      {
        title: 'Cache Storage API: Cache-First vs Network-First Strategies',
        q: 'Which caching strategy is optimal for static immutable assets (JS bundles, fonts) vs dynamic user profile data?',
        options: ['Network-First for static assets; Cache-First for profiles', 'Cache-First (falling back to network) for static assets; Network-First (falling back to cache) for dynamic profiles', 'Both should use no-cache headers', 'Cache-only for all requests'],
        correct: 1,
        exp: 'Static assets with hashed filenames never change, making Cache-First ideal; user profile data changes frequently, making Network-First essential.',
        task: 'Write a Service Worker fetch handler implementing Network-First for API routes and Cache-First for static assets.',
        code: 'self.addEventListener("fetch", (event) => {\n  const url = new URL(event.request.url);\n  if (url.pathname.startsWith("/api/")) {\n    event.respondWith(\n      fetch(event.request).catch(() => caches.match(event.request))\n    );\n  } else {\n    event.respondWith(\n      caches.match(event.request).then(cached => cached || fetch(event.request))\n    );\n  }\n});',
        out: 'Dual-strategy service worker fetch interceptor',
        cap: 'Implement a complete Workbox or custom caching strategy verifying offline functionality across 10 pages.'
      },
      {
        title: 'IndexedDB Storage for Large Structured Offline Datasets',
        q: 'Why is IndexedDB preferable over localStorage for caching large course syllabus documents and offline assessments?',
        options: ['localStorage is synchronous and limited to ~5MB of strings; IndexedDB is asynchronous, transactional, and can store gigabytes of structured objects', 'IndexedDB only stores CSS styles', 'localStorage is deprecated in modern browsers', 'IndexedDB automatically syncs to cloud storage'],
        correct: 0,
        exp: 'localStorage blocks the main thread and has severe 5MB storage limits; IndexedDB is asynchronous and handles rich structured data.',
        task: 'Implement a helper function saving a course object into an IndexedDB object store "courses".',
        code: 'export function saveCourseOffline(course) {\n  return new Promise((resolve, reject) => {\n    const req = indexedDB.open("TheHubOfflineDB", 1);\n    req.onupgradeneeded = (e) => e.target.result.createObjectStore("courses", { keyPath: "id" });\n    req.onsuccess = (e) => {\n      const tx = e.target.result.transaction("courses", "readwrite");\n      tx.objectStore("courses").put(course);\n      tx.oncomplete = () => resolve(true);\n      tx.onerror = () => reject(tx.error);\n    };\n  });\n}',
        out: 'IndexedDB async put transaction helper',
        cap: 'Build an offline course reader that loads 100% of lesson contents from IndexedDB when offline.'
      },
      {
        title: 'Background Sync API for Deferred Form Submissions',
        q: 'What capability does the Service Worker Background Sync API provide to web applications?',
        options: ['It downloads torrent files in the background', 'It defers actions (like quiz submissions) until the user has a stable internet connection, executing even if the browser tab was closed', 'It synchronizes passwords with Google Drive', 'It speeds up CPU execution by 50%'],
        correct: 1,
        exp: 'Background Sync guarantees that user-triggered network tasks execute as soon as connectivity is restored, even if the user closed the window.',
        task: 'Register a background sync tag "sync-assessment-submissions" when a user submits an assessment while offline.',
        code: 'async function queueOfflineAssessment(data) {\n  await saveToIndexedDB("pending_submissions", data);\n  if ("serviceWorker" in navigator && "SyncManager" in window) {\n    const reg = await navigator.serviceWorker.ready;\n    await reg.sync.register("sync-assessment-submissions");\n    return { queued: true };\n  }\n  return { queued: false };\n}',
        out: 'Background sync registration workflow',
        cap: 'Demonstrate offline assessment submission: disconnect network, submit test, reconnect, and verify auto-sync.'
      },
      {
        title: 'Asset Compression (Brotli/Gzip) & SVG Vector Optimization',
        q: 'How does Brotli compression compare to standard Gzip for web asset delivery in modern browsers?',
        options: ['Brotli only works on images', 'Brotli delivers 15-25% smaller payload sizes on text assets (JS, CSS, HTML) at high compression ratios compared to Gzip', 'Gzip is 10 times smaller than Brotli', 'Brotli is blocked by standard firewalls'],
        correct: 1,
        exp: 'Brotli utilizes an optimized static dictionary and context modeling, consistently outperforming Gzip in compression density.',
        task: 'Configure Vite build rollup options to split vendor chunks and compress output bundles.',
        code: '// vite.config.js snippet\nexport default {\n  build: {\n    rollupOptions: {\n      output: {\n        manualChunks: {\n          vendor: ["react", "react-dom", "react-router-dom"],\n          icons: ["lucide-react"]\n        }\n      }\n    },\n    chunkSizeWarningLimit: 600\n  }\n};',
        out: 'Vite chunk splitting configuration',
        cap: 'Audit production bundle size, ensuring total initial JavaScript payload remains under 120KB gzipped.'
      },
      {
        title: 'Image Lazy-Loading and Responsive Srcset Implementation',
        q: 'What is the performance advantage of combining loading="lazy" with responsive srcset attributes on <img> tags?',
        options: ['Images become invisible on desktop', 'The browser downloads only the image dimension matching the user\'s viewport and defers off-screen images until scrolled into view', 'It converts JPG images into MP4 videos', 'It removes all CSS styles from images'],
        correct: 1,
        exp: 'loading="lazy" prevents offscreen images from blocking initial paint, while srcset delivers appropriately scaled resolution.',
        task: 'Write a responsive ImageComponent rendering WebP with fallbacks and native lazy loading.',
        code: 'export function ResponsiveImage({ src, alt, className }) {\n  return (\n    <picture className={className}>\n      <source srcSet={`${src}?w=400 400w, ${src}?w=800 800w`} type="image/webp" />\n      <img src={`${src}?w=800`} alt={alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />\n    </picture>\n  );\n}',
        out: 'Responsive image component with WebP srcset',
        cap: 'Optimize a photo-heavy course catalog reducing initial page load weight by 80%.'
      },
      {
        title: 'Automated Integration Testing with Vitest and Supertest',
        q: 'Why are integration tests using Supertest preferred for validating REST APIs over isolated unit mocks alone?',
        options: ['Supertest runs without Node.js installed', 'Supertest executes real HTTP requests against the Express app instance, testing middleware, routing, and response serialization together', 'Unit tests cannot test JSON', 'Integration tests are mandatory for CSS styling'],
        correct: 1,
        exp: 'Supertest verifies the end-to-end HTTP lifecycle, ensuring middleware, request parsing, controller logic, and error handlers work in concert.',
        task: 'Write a Vitest integration test validating that GET /api/courses returns status 200 and an array of courses.',
        code: 'import { describe, it, expect } from "vitest";\nimport request from "supertest";\nimport { app } from "../server.js";\n\ndescribe("GET /api/courses", () => {\n  it("should return 200 with an array of courses", async () => {\n    const res = await request(app).get("/api/courses");\n    expect(res.status).toBe(200);\n    expect(res.body.success).toBe(true);\n    expect(Array.isArray(res.body.data)).toBe(true);\n  });\n});',
        out: 'Passing Supertest API integration suite',
        cap: 'Deliver a complete automated test suite covering authentication, enrollment, and profile routes.'
      },
      {
        title: 'End-to-End Capstone: Production-Ready Offline PWA for Community Health Workers',
        q: 'What are the three mandatory requirements for a web application to be recognized as an installable Progressive Web App (PWA)?',
        options: ['Must be hosted on AWS, use MongoDB, and have 10,000 users', 'Must run over HTTPS, include a valid Web App Manifest (with icons and name), and register a Service Worker with a fetch handler', 'Must be written in Kotlin', 'Must have a paid domain name'],
        correct: 1,
        exp: 'Installability criteria require secure HTTPS, a manifest.json with icons/start_url/display mode, and an active service worker.',
        task: 'Verify a complete PWA configuration including manifest.json, service worker cache strategy, and offline fallback page.',
        code: '// Web App Manifest snippet\n{\n  "name": "The Hub Rwanda - Community Learning PWA",\n  "short_name": "The Hub",\n  "start_url": "/",\n  "display": "standalone",\n  "background_color": "#ffffff",\n  "theme_color": "#2563eb",\n  "icons": [{ "src": "/pwa-192.png", "sizes": "192x192", "type": "image/png" }]\n}',
        out: 'Valid PWA manifest and service worker configuration',
        cap: 'Deploy a fully functional offline-first PWA achieving 100/100 Lighthouse PWA score with simulated offline operation.'
      }
    ]
  },
  {
    courseId: 'c-3',
    courseName: 'Professional English & Executive Communication',
    skillTarget: 'Executive Writing & Cross-Cultural Communication',
    topics: [
      {
        title: 'Workplace Email Structure: Clarity, Brevity, and Call-to-Action',
        q: 'What is the optimal structure for an executive workplace email requesting a decision from senior leadership?',
        options: ['Three long background paragraphs followed by a vague concluding remark', 'Clear Subject line with [Action Required], concise 2-sentence context, bulleted options with trade-offs, and an explicit Call to Action with deadline', 'Sending an unformatted text attachment only', 'Writing in all capital letters for urgency'],
        correct: 1,
        exp: 'Executives scan emails rapidly; leading with clear context, bulleted trade-offs, and an unambiguous deadline drives immediate action.',
        task: 'Draft an executive email requesting approval to launch a 30-district TVET data training program with budget options.',
        code: 'Subject: [Approval Needed] Launch of Q2 National TVET Analytics Cohort\n\nDear Director,\n\nFollowing our review of NISR youth indicators, we are prepared to onboard 1,500 TVET learners across all 5 provinces.\n\nKey Decisions Required:\n- Option A (Full Cloud): $12,000 (Includes live sandbox instances)\n- Option B (Hybrid Offline): $7,500 (Utilizes local PWA caches)\n\nRecommended: Option B aligns with our low-bandwidth mandate while reducing expenditure by 37%.\n\nPlease confirm your preferred option by Friday at 3:00 PM CAT.',
        out: 'Professional executive proposal email',
        cap: 'Submit a portfolio of 3 business emails: meeting request, project escalation, and partner partnership inquiry.'
      },
      {
        title: 'Crafting Professional Inquiries and Request Letters',
        q: 'When writing an official inquiry to an international development partner, what tone and register should be maintained?',
        options: ['Colloquial and casual with slang', 'Formal, respectful, objective, and clearly structured around mutual organizational goals', 'Aggressive and demanding', 'Poetic with metaphorical expressions'],
        correct: 1,
        exp: 'Official institutional correspondence requires a formal, courteous, and objective tone that highlights shared mission and clear next steps.',
        task: 'Draft an inquiry letter to an NGO requesting collaboration on youth statistical literacy workshops.',
        code: 'Dear Ms. Uwase,\n\nI am writing on behalf of The Hub Rwanda to explore a collaborative partnership regarding youth statistical literacy.\n\nWith youth employment participation in the services sector expanding by 38.6%, equipping emerging professionals with empirical research skills is a shared priority. We welcome the opportunity to schedule a 30-minute exploratory briefing next week.',
        out: 'Formal institutional inquiry letter',
        cap: 'Draft a formal request letter seeking bilateral support for provincial computer lab connectivity.'
      },
      {
        title: 'Delivering Constructive Peer Feedback with Diplomacy',
        q: 'What is the "Situation-Behavior-Impact" (SBI) framework for delivering constructive feedback?',
        options: ['Insulting the person publicly before offering advice', 'Grounding feedback in specific Situations, describing observed Behaviors objectively without judgment, and explaining the concrete Impact', 'Focusing exclusively on personal character flaws', 'Avoiding direct conversation and emailing rumors'],
        correct: 1,
        exp: 'SBI anchors feedback in observable facts rather than personal attacks, creating a psychologically safe space for professional improvement.',
        task: 'Write a constructive feedback memo to a peer whose late dataset submission delayed a national stakeholder report.',
        code: 'During yesterday\'s quarterly review (Situation), the district dataset was submitted two hours after the agreed 10:00 AM deadline (Behavior). As a result, the analytics team had to condense quality assurance reviews before presenting to the board (Impact). Moving forward, let us schedule a checkpoint 24 hours prior to identify blockers early.',
        out: 'SBI-aligned constructive feedback memo',
        cap: 'Conduct a recorded peer code and report review demonstrating diplomatic critique and actionable recommendations.'
      },
      {
        title: 'Drafting Concise Executive Summaries for C-Suite Leadership',
        q: 'What is the primary objective of an Executive Summary at the start of a 50-page technical research report?',
        options: ['To repeat the entire report in small font', 'To provide busy decision-makers with core findings, financial implications, risks, and strategic recommendations in 1-2 pages', 'To list references and academic bibliography', 'To thank all project contributors'],
        correct: 1,
        exp: 'The executive summary distills critical strategic insights and bottom-line recommendations so leaders can make informed decisions without reading 50 pages.',
        task: 'Draft a 150-word executive summary for a report on youth digital employment pathways in Rwanda.',
        code: 'Executive Summary:\nRwanda\'s transition toward an innovation-driven economy is accelerated by a 52.4% youth labor participation rate. However, empirical assessments reveal a 35% competency gap in practical data engineering and full-stack software development. This report outlines a dual-track workforce strategy: deploying low-bandwidth Competency-Based Curricula across all 30 districts, coupled with verifiable Skill Passports. Implementing this initiative will certify 50,000 job-ready youth by 2028 at an estimated unit cost of $42 per graduate.',
        out: '150-word high-impact executive summary',
        cap: 'Condense a 30-page national labour report into a high-impact 2-page executive summary.'
      },
      {
        title: 'Writing Effective Meeting Agendas and Distributing Action Items',
        q: 'What crucial information must accompany every action item in post-meeting minutes to ensure accountability?',
        options: ['The room temperature and seating order', 'Clear Owner (Name), Explicit Deliverable, and Concrete Deadline (Date and Time)', 'A summary of personal opinions', 'The meeting room booking number'],
        correct: 1,
        exp: 'Unassigned tasks are rarely completed; defining an owner, clear deliverable, and hard deadline enforces accountability.',
        task: 'Draft structured meeting minutes with 3 action items assigned to team members with specific deadlines.',
        code: 'Meeting Minutes: Curriculum Standards Steering Group\nDate: October 17, 2026\n\nAction Items:\n1. Update SQL question bank to 30 items | Owner: J. Mugabo | Deadline: Oct 20, 5:00 PM\n2. Run automated accessibility audit on portal | Owner: K. Umutoni | Deadline: Oct 22, 12:00 PM\n3. Reconcile provincial survey weights with NISR | Owner: A. Mukamana | Deadline: Oct 25, 3:00 PM',
        out: 'Accountability-driven meeting minutes',
        cap: 'Facilitate a mock sprint planning meeting and distribute minutes within 15 minutes of completion.'
      },
      {
        title: 'Active Listening & Clarification Techniques in Multilingual Meetings',
        q: 'Which verbal phrase demonstrates effective active listening and paraphrasing in an international business discussion?',
        options: ['"You are completely wrong about that."', '"If I understand correctly, your primary priority is ensuring offline access before scaling to rural TVET schools; is that accurate?"', '"Let me talk now."', '"I do not care about your perspective."'],
        correct: 1,
        exp: 'Paraphrasing verifies shared comprehension and demonstrates respect, especially in multilingual settings with varying accents.',
        task: 'Write 3 clarification scripts for navigating ambiguous technical requirements from an international consultant.',
        code: 'Clarification Scripts:\n1. Paraphrasing: "To ensure we are aligned, you are recommending we prioritize SQLite over IndexedDB for local caching?"\n2. Scope boundary: "Could you clarify whether user authentication must support single sign-on in phase one, or is email/password sufficient?"\n3. Impact check: "When you mention low bandwidth, what maximum latency threshold are we targeting for district centers?"',
        out: 'Professional clarification scripts',
        cap: 'Participate in a multilingual simulated technical negotiation, documenting clarifying questions.'
      },
      {
        title: 'Professional Telephone & Video Conference Etiquette',
        q: 'What is the recognized best practice when joining a virtual video conference with over 15 international delegates?',
        options: ['Keep microphone unmuted while having background conversations', 'Mute your microphone upon entry, verify camera framing with neutral lighting, and use the "Raise Hand" or chat feature for questions', 'Interrupt the speaker immediately with personal greetings', 'Turn off all audio and leave without notification'],
        correct: 1,
        exp: 'Muting background noise and using orderly queue mechanisms maintains professionalism and prevents acoustic feedback loops.',
        task: 'Draft a standard video conference protocol guide for learners participating in remote employer mentorship circles.',
        code: 'Remote Conference Guidelines for The Hub Learners:\n1. Connectivity Check: Test audio/camera 5 minutes prior to start time.\n2. Audio Discipline: Keep microphone muted unless called upon by the facilitator.\n3. Chat Protocol: Submit concise questions in the chat prefixing with [QUESTION].\n4. Professional Presence: Maintain eye contact with camera when presenting.',
        out: 'Remote meeting etiquette checklist',
        cap: 'Host a 10-minute remote webinar demonstrating camera presence, screen sharing transitions, and chat moderation.'
      },
      {
        title: 'Persuasive Pitching: Problem, Solution, and Value Proposition',
        q: 'In a 3-minute executive venture pitch, what should be presented within the first 30 seconds (the "Hook")?',
        options: ['The company\'s legal tax registration number', 'A compelling problem statement grounded in an undeniable statistic or human story that immediately demonstrates urgency', 'A detailed line-by-line financial ledger', 'A list of your college courses'],
        correct: 1,
        exp: 'The hook captures immediate attention by demonstrating a significant, urgent, and quantifiable market pain point.',
        task: 'Draft a 100-word pitch script for The Hub Skill Passport addressing employer hiring friction in Kigali.',
        code: '"Rwandan tech employers currently spend an average of 45 days verifying junior developer credentials, with 60% of applicants failing basic practical coding tests. The Hub solves this with the verified Skill Passport: a tamper-proof digital credential combining 30% theory, 40% hands-on sandbox code, and 30% capstone evidence. We reduce hiring time from 45 days to under 48 hours while guaranteeing authentic competency. Let us build Rwanda\'s future workforce together."',
        out: 'High-impact 100-word elevator pitch',
        cap: 'Deliver a video-recorded 3-minute pitch presenting an educational solution to institutional investors.'
      },
      {
        title: 'Technical Concept Explanation for Non-Technical Stakeholders',
        q: 'How should a data engineer explain "PostgreSQL Database Indexing" to a non-technical government minister?',
        options: ['"It is an O(log N) balanced B-Tree traversal over physical memory blocks."', '"Think of an index like the index at the back of a 500-page textbook: instead of reading every page from page 1 to find a topic, you jump directly to the exact page number instantly."', '"It has no real meaning; it is just standard software code."', '"Ministers do not need to understand how computers work."'],
        correct: 1,
        exp: 'Relatable metaphors (like a book index) translate abstract algorithmic concepts into intuitive operational value.',
        task: 'Write a non-technical explanation of "Progressive Web App Offline Caching" for a district education officer.',
        code: 'Analogy for District Education Officers:\n"Imagine carrying a physical spiral notebook to a meeting instead of having to phone an office in Kigali every time you need to check a phone number. A Progressive Web App works the same way: it automatically saves your lessons into a secure digital notebook on your phone. Even when the mobile tower is completely offline in rural sectors, students can read and study without interruption. When the signal returns, their quiz scores sync automatically."',
        out: 'Accessible operational analogy',
        cap: 'Explain 3 complex technical terms (API, Cloud Computing, Encryption) using simple workplace analogies.'
      },
      {
        title: 'Visual Storytelling: Aligning Slide Decks with Narrative Arc',
        q: 'What is the "Guy Kawasaki 10/20/30 Rule" for effective presentation slide decks?',
        options: ['100 slides, 20 minutes, 30 animations', '10 slides optimal, 20 minutes maximum duration, and minimum 30-point font size for readability', '10 colors, 20 transitions, 30 bullets per page', '10 presenters, 20 agendas, 30 handouts'],
        correct: 1,
        exp: 'The 10/20/30 rule forces presenters to focus on essential ideas, maintain audience attention, and avoid illegible wall-of-text slides.',
        task: 'Design a 5-slide outline with titles and bullet points for presenting national skill gap findings to development partners.',
        code: 'Slide 1: Title & Strategic Purpose (Rwanda Skills Landscape 2026)\nSlide 2: The Macroeconomic Evidence (NISR Services Growth: 38.6%)\nSlide 3: The Demonstrated Competency Gap (Assessment Findings across 5 Provinces)\nSlide 4: The Hub Intervention Model (Competency Curricula + Digital Passports)\nSlide 5: Investment & Partnership Roadmap (Milestones for Q3/Q4)',
        out: '5-slide strategic presentation deck outline',
        cap: 'Produce a 10-slide presentation deck using high-contrast design and data callouts.'
      },
      {
        title: 'Managing High-Pressure Q&A Sessions and Objections',
        q: 'What is the recommended strategy when an audience member asks a technical question for which you do not know the answer?',
        options: ['Fabricate an answer and hope nobody notices', 'Acknowledge the question with honesty, state what you know, and commit to following up with the verified answer by a specific time', 'Attack the questioner\'s credibility', 'Ignore the question and end the meeting immediately'],
        correct: 1,
        exp: 'Intellectual honesty builds credibility; fabricating answers destroys professional trust.',
        task: 'Draft response scripts for handling budget skepticism and technical feasibility challenges.',
        code: 'Objection Handling Scripts:\n1. Budget Concern: "We appreciate that upfront connectivity investment requires scrutiny. Our data demonstrates that offline PWA architectures reduce recurring mobile data expenditures by 65%, achieving full breakeven within 7 months."\n2. Unknown Data Point: "That is an insightful inquiry regarding rural solar uptime metrics. I do not have the exact Q4 telemetry at hand, but I will extract the figures and email you before 5:00 PM today."',
        out: 'Professional objection handling scripts',
        cap: 'Record a mock Q&A session responding to 3 aggressive stakeholder objections.'
      },
      {
        title: 'Cross-Cultural Communication in East African Business',
        q: 'When conducting commercial negotiations across Rwanda, Kenya, and Tanzania, what communication dimension is vital to observe?',
        options: ['Ignoring cultural greetings and speaking immediately about money', 'Respecting greeting protocols, relationship building, and understanding differences in indirect vs direct communication styles', 'Insisting that everyone speaks French', 'Refusing to meet in person'],
        correct: 1,
        exp: 'East African business culture values mutual respect, professional courtesies, and relational trust prior to formal transactional deal-making.',
        task: 'Write a cross-cultural briefing note for international delegates visiting Kigali for the East African Trade Summit.',
        code: 'Kigali Executive Protocol Briefing:\n1. Greetings: Warm formal greetings ("Muraho", handshake with both hands) signal respect before business discussion.\n2. Punctuality: Rwandan official meetings adhere strictly to scheduled start times.\n3. Cleanliness & Environment: Umuganda national service and strict anti-littering laws are national points of pride; honor local environmental regulations.',
        out: 'Cultural competence briefing note',
        cap: 'Draft a cross-border trade proposal honoring regional EAC legal and cultural nuances.'
      },
      {
        title: 'Tone Modulation: Navigating Formal, Diplomatic, and Semi-Formal Register',
        q: 'Which sentence correctly demonstrates a diplomatic tone when rejecting a vendor proposal that is over budget?',
        options: ['"Your pricing is ridiculous and we will never work with you."', '"While we appreciate the thoroughness of your proposal, the projected costs exceed our allocated budget; we would welcome a revised scope aligned with our parameters."', '"No way."', '"We are throwing your proposal in the trash."'],
        correct: 1,
        exp: 'Diplomatic language maintains positive professional relationships while remaining firm on commercial and budgetary boundaries.',
        task: 'Rewrite three blunt internal messages into constructive, diplomatic workplace communications.',
        code: '1. Blunt: "Your code is broken." -> Diplomatic: "I noticed a few edge cases failing during integration testing; let us pair on resolving them."\n2. Blunt: "You missed the deadline." -> Diplomatic: "We were expecting this deliverable by 10:00 AM; could you update us on current progress and completion ETA?"\n3. Blunt: "I don\'t agree with this strategy." -> Diplomatic: "I have a few alternative perspectives on risk mitigation that I would like to discuss before we finalize the plan."',
        out: 'Diplomatic communication revisions',
        cap: 'Draft 3 formal diplomatic letters: tender rejection, contract amendment request, and partnership appreciation.'
      },
      {
        title: 'Writing Clear Standard Operating Procedures (SOPs)',
        q: 'What is the hallmark of an effective Standard Operating Procedure (SOP)?',
        options: ['Long, poetic paragraphs with ambiguous instructions', 'Step-by-step numbered instructions, clear prerequisites, defined roles, and measurable success criteria that anyone can follow', 'Leaving procedures to individual memory', 'Writing in coded jargon'],
        correct: 1,
        exp: 'SOPs exist to standardize quality and reduce operational errors through sequential, unambiguous, and reproducible steps.',
        task: 'Write an SOP for issuing verified digital credentials on The Hub platform.',
        code: 'SOP: Digital Credential Verification & Issuance\n1. Purpose: Ensure only verified assessment scores receive accredited badges.\n2. Prerequisites: Learner must achieve >= 65% composite score (Theory 30%, Practical 40%, Capstone 30%).\n3. Steps:\n   a. Admin logs into /admin command console.\n   b. Navigate to "Assessments Queue" and verify capstone link.\n   c. Click "Issue Credential" and select verified competency tier.\n   d. Confirm blockchain hash generation and notify learner via email.\n4. Verification Metric: 100% audit log trail created.',
        out: 'Step-by-step verified SOP document',
        cap: 'Develop a 4-procedure operational manual for running community computer centers in rural districts.'
      },
      {
        title: 'Drafting Compelling Grant & Innovation Proposals',
        q: 'When writing a grant proposal for international donors, what is the "Theory of Change"?',
        options: ['A philosophical thesis about economics', 'A clear logical framework linking project Inputs → Activities → Outputs → Outcomes → Long-term Impact', 'A guarantee of 100% financial profit for donors', 'A software programming paradigm'],
        correct: 1,
        exp: 'The Theory of Change demonstrates the causal chain between donor funding (inputs) and sustainable societal outcomes.',
        task: 'Draft the "Theory of Change" section for a $50,000 grant proposal expanding digital skills to 1,000 rural female youth.',
        code: 'Theory of Change:\n- Inputs: $50,000 grant funding, 50 refurbished low-power laptops, curriculum.\n- Activities: Deliver 12-week offline-first data analytics training in 5 rural TVET centers.\n- Outputs: 1,000 young women certified with Level 2 verified Skill Passports.\n- Outcomes: 65% of graduates gain remote digital freelancing or local cooperative bookkeeping employment within 6 months.\n- Impact: Household income increases by an average of 45%, advancing NST2 gender empowerment goals.',
        out: 'Structured Theory of Change framework',
        cap: 'Author a complete 5-page innovation grant proposal targeting international educational technology funds.'
      },
      {
        title: 'Crafting Request for Proposal (RFP) Response Documents',
        q: 'In competitive RFP bidding, what is a "Compliance Matrix"?',
        options: ['A list of company computer passwords', 'A structured table mapping every single client requirement from the RFP to the exact page and section where it is fulfilled in your proposal', 'A financial tax report', 'An organizational hierarchy chart'],
        correct: 1,
        exp: 'A compliance matrix proves to procurement evaluators that your bid complies 100% with every mandatory tender specification.',
        task: 'Create an RFP compliance table for an educational software platform tender.',
        code: '| RFP Mandatory Requirement | Compliance Status | Proposal Section Reference |\n|---|---|---|\n| 1. Offline PWA Functionality | Full Compliance | Section 3.2, Page 12 |\n| 2. PostgreSQL Relational Integrity | Full Compliance | Section 4.1, Page 16 |\n| 3. Dual Auth (Learner / Admin) | Full Compliance | Section 2.4, Page 8 |\n| 4. Tri-Part Assessment Engine | Full Compliance | Section 5.3, Page 22 |',
        out: 'RFP compliance matrix table',
        cap: 'Prepare a 15-page formal RFP response bid for a national digital learning infrastructure contract.'
      },
      {
        title: 'Principles of Collaborative Win-Win Business Negotiations',
        q: 'What is BATNA in negotiation theory (Fisher & Ury, "Getting to Yes")?',
        options: ['Best Alternative To a Negotiated Agreement - your walk-away fallback if negotiations fail', 'Business And Tax National Association', 'Bargaining At The National Assembly', 'Buying Assets Through New Accounts'],
        correct: 0,
        exp: 'Knowing your BATNA gives you negotiating leverage and establishes the walk-away threshold below which no agreement should be signed.',
        task: 'Draft negotiation strategy notes establishing your target price, reservation price, and BATNA for cloud server hosting.',
        code: 'Negotiation Strategy Brief:\n- Target Price: $400 / month (Includes dedicated memory and SSL)\n- Reservation Price (Walk-away): $650 / month\n- Value Levers to Offer: 2-year upfront commitment, featured case study on regional innovation portal\n- BATNA: Deploying on self-managed local datacenter nodes at $500 / month with higher maintenance overhead',
        out: 'Negotiation strategy planning dossier',
        cap: 'Conduct a recorded multi-issue negotiation simulation with written contract settlement.'
      },
      {
        title: 'Handling Client Complaints and Service Recovery Communication',
        q: 'What are the essential steps of the "HEAR" framework in customer service recovery?',
        options: ['Hang up, Evade, Argue, Report', 'Hear (listen fully without interruption), Empathize (validate their frustration), Apologize (take organizational responsibility), Resolve (provide immediate concrete solution)', 'Hire, Explain, Accuse, Retaliate', 'Ignore the complaint entirely'],
        correct: 1,
        exp: 'The HEAR protocol de-escalates emotionally charged conflicts and converts dissatisfied customers into loyal advocates through decisive resolution.',
        task: 'Write a response letter to a school principal whose students experienced an unexpected portal login outage during exams.',
        code: 'Dear Principal Kayitesi,\n\nThank you for reaching out regarding the system timeout your students experienced during yesterday morning\'s statistical literacy assessment.\n\nWe understand completely how stressful this disruption was for your candidates and faculty (Empathize). We sincerely apologize for this operational failure, which occurred due to an unannounced server proxy upgrade (Apologize).\n\nTo resolve this immediately: we have reset all affected test attempts, extended the testing window by 72 hours, and provisioned a dedicated offline fallback server for your lab (Resolve). I will personally call you at 8:00 AM tomorrow to verify smooth operations.',
        out: 'De-escalation service recovery letter',
        cap: 'Formulate an institutional customer service escalation policy and response template repository.'
      },
      {
        title: 'Professional Resume & Curriculum Vitae (CV) Optimization',
        q: 'Which bullet point format demonstrates high-impact achievement on a professional software or data resume?',
        options: ['"Responsible for writing some SQL queries and attending meetings."', '"Engineered automated PostgreSQL ETL pipelines for 30 district datasets, cutting data processing time by 42% and enabling real-time youth employment tracking."', '"Worked with Python and computers."', '"Helped my boss do analytics."'],
        correct: 1,
        exp: 'High-impact resume bullets follow the Google X-Y-Z formula: "Accomplished [X], as measured by [Y], by doing [Z]" using strong action verbs.',
        task: 'Transform 3 passive job descriptions into action-oriented, quantified achievement statements.',
        code: '1. Passive: "Helped students with React." -> Quantified: "Mentored 45 junior developers in React 19 and Tailwind CSS, resulting in an 88% course completion rate and 12 job placements."\n2. Passive: "Cleaned data in Excel." -> Quantified: "Automated cleaning of 150,000 NISR census rows using Python and Pandas, reducing manual audit errors by 95%."\n3. Passive: "Wrote documentation." -> Quantified: "Authored 14 comprehensive API Standard Operating Procedures, onboarding 6 new engineers in under 5 days."',
        out: 'Action-verb quantified resume bullet points',
        cap: 'Produce a publication-ready 2-page professional resume adhering to international ATS readability standards.'
      },
      {
        title: 'Writing Impactful LinkedIn Summaries & Professional Dossiers',
        q: 'What elements should be prioritized in the "About" summary of a LinkedIn profile for an emerging tech professional in Rwanda?',
        options: ['A copy-paste of high school grades', 'A compelling professional narrative: core technical competencies, verified projects/evidence, passion for Rwanda\'s digital growth, and a clear call-to-action for collaboration', 'Leaving the section blank', 'Posting random inspirational quotes'],
        correct: 1,
        exp: 'Recruiters seek clear competency keywords, demonstrable project evidence, and genuine narrative motivation.',
        task: 'Draft a 150-word LinkedIn professional summary for an aspiring junior data analyst in Kigali.',
        code: 'About Me:\nI transform complex socioeconomic data into clear, actionable intelligence for Rwandan businesses and policymakers. With verified competencies in PostgreSQL, Python (Pandas/NumPy), and statistical survey analysis, I specialize in building low-bandwidth dashboards grounded in official NISR benchmarks.\n\nRecently, I engineered the 30-District Youth Economic Opportunity Pipeline, automating demographic reporting across 5 provinces. I hold a verified Level 2 Skill Passport from The Hub Rwanda and am passionate about expanding digital inclusion.\n\nOpen to junior data analytics roles and collaborative research projects. Let\'s connect: jc.mugabo@thehub.rw',
        out: '150-word optimized LinkedIn dossier',
        cap: 'Audit and polish your live professional LinkedIn profile incorporating verified credentials.'
      },
      {
        title: 'Job Interview Mastery: STAR Method for Behavioral Questions',
        q: 'What does the STAR interview technique stand for when answering behavioral questions like "Tell me about a time you resolved a technical crisis"?',
        options: ['Start, Think, Argue, Run', 'Situation (Context), Task (Your responsibility), Action (Specific steps you executed), Result (Quantified outcome and learning)', 'Speech, Tone, Attitude, Reply', 'Standard Technical Assessment Routine'],
        correct: 1,
        exp: 'STAR provides a concise, structured storytelling framework that highlights personal agency and verifiable results.',
        task: 'Draft a complete STAR response to the prompt: "Describe a situation where a project deadline was at risk and how you handled it."',
        code: 'STAR Interview Response:\n- Situation: During our capstone sprint, our team had 48 hours to deliver an offline inventory app for a Musanze coffee cooperative.\n- Task: As the frontend lead, I had to ensure offline synchronization worked reliably despite frequent simulated network drops.\n- Action: I isolated the failing IndexedDB promise chain, refactored the fetch interceptor with exponential backoff, and held 2 daily pairing check-ins.\n- Result: We delivered the functional PWA 6 hours ahead of schedule, passing 100% of offline verification tests and earning the highest cohort rating.',
        out: 'Structured STAR interview narrative',
        cap: 'Participate in a 15-minute simulated behavioral interview evaluated against STAR scoring rubrics.'
      },
      {
        title: 'Salary Negotiation and Employment Offer Review Communication',
        q: 'When receiving a written job offer that is 15% below your target market rate, how should you initiate salary negotiations professionally?',
        options: ['Send an angry email rejecting the offer with insults', 'Express genuine gratitude for the offer, reiterate your enthusiasm for the role, and present research-backed compensation benchmarks with a counter-offer range', 'Accept the low offer immediately and complain to coworkers later', 'Ghost the recruiter'],
        correct: 1,
        exp: 'Negotiating respectfully with market data demonstrates business acumen and self-worth without jeopardizing the underlying offer.',
        task: 'Draft a salary negotiation email responding to a job offer, proposing a 12% adjustment based on national tech market data.',
        code: 'Dear Mr. Ruzindana,\n\nThank you very much for offering me the role of Junior Data Analyst at TechRwanda. I am truly excited about the prospect of contributing to your team\'s innovative work.\n\nBased on my demonstrated competencies in PostgreSQL and Python, my Level 2 verified Skill Passport, and current market benchmarks for data professionals in Kigali, I would like to explore whether an adjustment to RWF 850,000 monthly base salary is feasible.\n\nI am confident I will deliver immediate value and look forward to discussing this proposal.',
        out: 'Diplomatic salary counter-proposal letter',
        cap: 'Conduct a simulated employment offer negotiation balancing base compensation, training stipends, and remote flexibility.'
      },
      {
        title: 'Press Release Drafting for Product & Milestone Announcements',
        q: 'In media and public relations, what information must appear in the opening dateline and lead paragraph of a press release?',
        options: ['The CEO\'s life story', 'City, Country, Date, followed by the essential Who, What, When, Where, and Why of the news milestone', 'A disclaimer that the news is private', 'Five paragraphs of legal copyright terms'],
        correct: 1,
        exp: 'Journalists scan press releases using the inverted pyramid structure; the lead paragraph must convey the core news story immediately.',
        task: 'Write a press release announcement for The Hub Rwanda certifying its 10,000th learner.',
        code: 'FOR IMMEDIATE RELEASE\nKIGALI, RWANDA — October 17, 2026\n\nTHE HUB RWANDA REACHES HISTORIC MILESTONE: 10,000 YOUTH CERTIFIED WITH VERIFIED DIGITAL SKILL PASSPORTS\n\nThe Hub Rwanda, the national skills and education platform, today announced the official certification of its 10,000th learner. Aligned with the National Strategy for Transformation (NST2), the initiative equips emerging talent across all 30 districts with accredited competencies in Data Analytics, Software Engineering, and Modern Agribusiness.\n\n"Today proves that when digital curricula meet empirical market demand, Rwandan youth excel," stated Dr. Alice Mukamana, Director of Skills Telemetry.\n\nMedia Contact: press@thehub.rw | +250 788 123 456',
        out: 'Standard media press release',
        cap: 'Draft a 1-page press release and executive quote announcing a new national corporate hiring partnership.'
      },
      {
        title: 'Internal Crisis Communication and Status Incident Reports',
        q: 'What is the primary responsibility of a tech team during an unplanned production server outage regarding user communication?',
        options: ['Deny that any problem exists and delete user complaints', 'Publish transparent, timely status updates acknowledging the incident, stating known impact, actions being taken, and next update ETA', 'Wait until the issue is resolved 3 days later to inform users', 'Blame external telecommunications providers publicly'],
        correct: 1,
        exp: 'Transparent crisis communication maintains user trust and reduces panic by demonstrating control and systematic resolution.',
        task: 'Draft an internal incident status report for a database connection pool outage affecting learner assessments.',
        code: 'INCIDENT UPDATE: Assessment Engine Degraded Performance\n- Status: Investigating\n- Impact: Learners experiencing 504 Gateway Timeouts when submitting Part 2 practical tasks.\n- Root Cause (Preliminary): PostgreSQL connection pool reached maximum threshold following cohort surge.\n- Actions Taken: Scaling active pool connections from 20 to 50; restarting standby worker instances.\n- Next Update: 11:30 AM CAT (or upon complete service restoration).\n- Incident Commander: Tech Lead (J. Mugabo)',
        out: 'Real-time incident report broadcast',
        cap: 'Execute a simulated cyber crisis tabletop exercise, authoring real-time internal and external communication bulletins.'
      },
      {
        title: 'Facilitating Focus Groups and Stakeholder Workshops',
        q: 'As a workshop facilitator, how do you handle a vocal participant who is dominating the discussion and silencing other attendees?',
        options: ['Shout at the participant to be quiet', 'Acknowledge their contribution politely and deliberately pivot to invite input from quieter members: "Thank you for that perspective, Jean. Let us hear from someone in the Northern Province group who hasn\'t spoken yet."', 'Cancel the workshop immediately', 'Agree with everything they say to avoid conflict'],
        correct: 1,
        exp: 'Skillful facilitation validates all contributions while maintaining balanced participation across diverse stakeholder groups.',
        task: 'Write a facilitation guide with 3 intervention techniques for managing stakeholder focus groups on education curriculum.',
        code: 'Facilitation Intervention Techniques:\n1. The Pivot: "Thank you, Emmanuel. That brings up a valuable operational point. Let\'s hear how this aligns with the teachers in Musanze."\n2. Round-Robin: "For the next 5 minutes, each table will have 45 seconds to share their top priority without interruptions."\n3. The Parking Lot: "That is an important topic that deserves dedicated discussion; let\'s place it in our Parking Lot board for our Q&A block."',
        out: 'Focus group facilitation playbook',
        cap: 'Facilitate a 20-minute stakeholder co-design session producing a synthesized consensus summary.'
      },
      {
        title: 'Writing Annual Progress Reports with Quantitative Milestones',
        q: 'How should annual organizational achievements be presented to board members and government oversight ministries?',
        options: ['With emotional opinions and vague claims', 'Comparing actual performance metrics against predetermined strategic targets (e.g. Target: 5,000 enrollees vs Actual: 6,420 enrollees; +28.4% variance)', 'By hiding all goals that were not achieved', 'In informal handwritten notes'],
        correct: 1,
        exp: 'Quantitative variance reporting (Target vs Actual) demonstrates rigorous accountability and empirical governance.',
        task: 'Draft a progress summary table for an annual workforce development program across 4 key metrics.',
        code: '| Strategic Milestone | 2026 Target | 2026 Actual | Variance | Status |\n|---|---|---|---|---|\n| 1. Certified Learners | 8,000 | 10,240 | +28.0% | Exceeded |\n| 2. Female Participation Rate | 50.0% | 52.4% | +2.4% | Exceeded |\n| 3. Rural District Centers | 20 | 22 | +10.0% | Achieved |\n| 4. Average Course Completion Rate | 75.0% | 79.2% | +4.2% | Achieved |',
        out: 'Annual milestone variance matrix',
        cap: 'Compile a comprehensive 10-page Annual Program Review report with graphical milestone dashboards.'
      },
      {
        title: 'Proofreading & Editing: Eliminating Redundancies and Passive Jargon',
        q: 'Which edited sentence eliminates bureaucratic wordiness while preserving exact meaning?',
        options: ['"It is with great certainty that we are currently in the process of finalizing the completion of the report at this moment in time."', '"We are finalizing the report."', '"Finalization of the report is being undergone by our team presently."', '"The report is existing in a state of finalization."'],
        correct: 1,
        exp: '"We are finalizing the report" cuts 15 unnecessary words, active voice, and bureaucratic clutter, improving reading comprehension.',
        task: 'Edit three wordy administrative sentences into crisp, professional, active-voice communications.',
        code: '1. Wordy: "Due to the fact that rainfall was heavy, the event was postponed." -> Crisp: "Heavy rainfall postponed the event."\n2. Wordy: "At this point in time, our team is cognizant of the issue." -> Crisp: "We are aware of the issue."\n3. Wordy: "A decision was arrived at by the committee to approve the budget." -> Crisp: "The committee approved the budget."',
        out: 'Proofreading and conciseness corrections',
        cap: 'Conduct a comprehensive editorial review on a 5-page curriculum whitepaper eliminating passive and redundant jargon.'
      },
      {
        title: 'Intercultural Business Protocol for Diplomatic & International Summits',
        q: 'What is the standard diplomatic order of precedence when introducing dignitaries at an international conference in Kigali?',
        options: ['Introduce the youngest person first', 'Acknowledge the highest-ranking state official or head of delegation first, followed by institutional leads in descending order of official precedence', 'Introduce speakers in alphabetical order by shoe size', 'Dignitaries should not be introduced'],
        correct: 1,
        exp: 'State and diplomatic protocol strictly dictates recognizing the highest-ranking constitutional official first to honor national sovereignty and status.',
        task: 'Draft an opening salutary protocol script for introducing the Minister of Education and regional delegates at a conference.',
        code: 'Opening Protocol Address:\n"Honorable Minister of Education of the Republic of Rwanda;\nDistinguished Heads of Diplomatic Missions and Development Agencies;\nEsteemed Director General of the Rwanda Basic Education Board;\nDistinguished guests, educators, and emerging scholars: Welcome to the 2026 National Education & Skills Summit."',
        out: 'Diplomatic salutary protocol address',
        cap: 'Write an official summit seating and speaker introduction protocol binder for a 3-day ministerial conference.'
      },
      {
        title: 'Drafting Memorandum of Understanding (MoU) Term Sheets',
        q: 'What distinguishes a Memorandum of Understanding (MoU) from a legally binding commercial contract?',
        options: ['An MoU expresses mutual intent and strategic alignment to collaborate, generally without creating legally enforceable monetary liabilities', 'MoUs can only be signed between countries', 'An MoU is always illegal', 'Contracts do not require signatures'],
        correct: 0,
        exp: 'An MoU outlines mutual goals and cooperative frameworks between organizations before or alongside binding service agreements.',
        task: 'Draft the "Core Responsibilities" clauses for an MoU between The Hub and an employer hiring partner.',
        code: 'MoU Term Sheet Clauses:\n1. The Hub Responsibilities:\n   a. Provide employer with verified digital credentials and candidate portfolios.\n   b. Maintain tamper-proof public verification URLs for certified graduates.\n2. Employer Partner Responsibilities:\n   a. Guarantee interview screening for certified Level 2 and Level 3 candidates.\n   b. Provide feedback on industry skill requirements every quarter.\n3. Non-Binding Clause: This agreement expresses mutual intent and does not create direct financial obligations.',
        out: 'Structured MoU term sheet framework',
        cap: 'Author a complete 4-page institutional partnership MoU with governance and renewal provisions.'
      },
      {
        title: 'Capstone Oral Presentation: 5-Minute Executive Policy Briefing',
        q: 'In a 5-minute timed policy briefing to government decision-makers, how much time should be allocated to recommendations vs background context?',
        options: ['4.5 minutes on background, 30 seconds on recommendations', 'At most 1.5 minutes on context, dedicating 3.5 minutes to actionable recommendations, evidence, and implementation costs', '5 minutes of silence', 'Only reading slides word for word'],
        correct: 1,
        exp: 'Decision-makers already know the broad problem; high-value briefings dedicate 70% of time to viable solutions, costs, and policy action.',
        task: 'Create a minute-by-minute speaking outline for a 5-minute national workforce briefing.',
        code: '5-Minute Executive Briefing Timetable:\n- 0:00 - 1:00: The Problem: Youth participation vs services sector skill shortage (NISR 38.6%).\n- 1:00 - 2:30: The Solution: Scaled offline Competency-Based Learning + Verified Passports.\n- 2:30 - 4:00: Impact & Economics: Cost per trainee ($42) vs estimated tax contribution ($320/yr).\n- 4:00 - 5:00: The Call to Action: Immediate ministerial sign-off for phase 2 expansion across 10 districts.',
        out: '5-minute executive briefing blueprint',
        cap: 'Deliver and record a live 5-minute policy briefing with slide accompaniment, judged on clarity and pacing.'
      }
    ]
  },
  {
    courseId: 'c-4',
    courseName: 'Modern Agribusiness & Cooperative Supply Chains',
    skillTarget: 'Cooperative Governance, AgTech & Supply Chain Logistics',
    topics: [
      {
        title: 'Cooperative Governance: The Cooperative Societies Act & Bylaws',
        q: 'Under Rwanda Cooperative Agency (RCA) statutory law, what is the supreme decision-making organ of an agricultural cooperative?',
        options: ['The Board Chairperson acting alone', 'The General Assembly of all registered cooperative members', 'The local commercial bank', 'The contracted transport company'],
        correct: 1,
        exp: 'RCA law establishes that the General Assembly represents the collective ownership and supreme authority of any cooperative society.',
        task: 'Draft a standard resolution template for an Annual General Assembly authorizing seasonal fertilizer bulk procurement.',
        code: 'Resolution Template - RCA Cooperative Governance:\nCooperative Name: Abahuza Coffee Producers Cooperative\nDate of General Assembly: October 17, 2026\n\nResolution 04/2026: The General Assembly, having gathered with a certified quorum of 84% active members, hereby votes unanimously to authorize the Executive Committee to negotiate a bulk fertilizer procurement contract not exceeding RWF 14,500,000 for the 2027 Season A.',
        out: 'Official RCA-compliant resolution draft',
        cap: 'Audit a cooperative\'s governance bylaws, ensuring full compliance with current RCA regulatory frameworks.'
      },
      {
        title: 'Democratic Decision-Making and Annual General Assembly (AGM) Protocols',
        q: 'What is the core cooperative voting principle universally upheld by the International Co-operative Alliance (ICA)?',
        options: ['One share equals one vote (the richest member gets the most votes)', 'One member, one vote, regardless of share capital held', 'Only founding members can vote', 'Government officials cast all votes'],
        correct: 1,
        exp: 'The democratic principle "One member, one vote" guarantees equal voice and prevents wealthier shareholders from dominating cooperative policy.',
        task: 'Create an AGM meeting notice with certified agenda items and proxy voting regulations.',
        code: 'Annual General Assembly Notice:\nTo: All Registered Members of Twitezimbere Maize Cooperative\nNotice is hereby given that the AGM will convene at Nyagatare Community Hall on Nov 15, 2026 at 9:00 AM.\n\nAgenda:\n1. Financial Audit & Dividend Review for Fiscal Year 2025/2026\n2. Election of Supervisory Committee Members\n3. Approval of Silo Expansion Budget\nNote: Voting adheres strictly to the "One Member, One Vote" standard.',
        out: 'Formal cooperative AGM convening notice',
        cap: 'Develop an AGM planning binder including quorum tracking sheets and election protocol ballots.'
      },
      {
        title: 'Chart of Accounts Setup for Agricultural Cooperative Enterprises',
        q: 'In a standardized cooperative chart of accounts, which number range conventionally represents Current Assets (e.g. cash, grain inventory)?',
        options: ['1000 - 1999', '4000 - 4999 (Revenue)', '5000 - 5999 (Expenses)', '9000 - 9999 (Taxes)'],
        correct: 0,
        exp: 'Standard accounting taxonomy allocates the 1000-series to Assets, 2000 to Liabilities, 3000 to Equity, 4000 to Revenue, and 5000+ to Expenses.',
        task: 'Build a simplified Chart of Accounts for an agricultural cooperative tracking member loans, crop inventory, and coffee sales.',
        code: 'Cooperative Chart of Accounts:\n- 1010: Cash on Hand\n- 1020: Mobile Money (MoMo) Merchant Account\n- 1050: Raw Coffee Inventory (Parchment)\n- 1100: Member Agricultural Input Advances\n- 2010: Accounts Payable (Fertilizer Suppliers)\n- 3010: Member Share Capital\n- 4010: Green Coffee Export Sales\n- 5010: Washing Station Operating Labor',
        out: 'Agricultural cooperative chart of accounts',
        cap: 'Set up a double-entry general ledger tracking seasonal harvest transactions for a 200-member cooperative.'
      },
      {
        title: 'Cash Book & General Ledger Reconciliation for Member Deposits',
        q: 'What is the purpose of conducting a monthly bank reconciliation between the cooperative\'s cash book and bank statement?',
        options: ['To delete past financial records', 'To identify discrepancies such as uncredited member deposits, bank charges, and transit checks, ensuring accurate books', 'To calculate crop yields', 'To pay taxes twice'],
        correct: 1,
        exp: 'Bank reconciliation identifies timing differences, unrecorded fees, and bookkeeping errors, preventing embezzlement and fraud.',
        task: 'Write a reconciliation summary calculating adjusted cash book balance given bank balance, outstanding checks, and deposits in transit.',
        code: 'def reconcile_cooperative_cash(bank_statement_balance, deposits_in_transit, outstanding_checks, unrecorded_bank_fees):\n    adjusted_bank = bank_statement_balance + deposits_in_transit - outstanding_checks\n    adjusted_cashbook = adjusted_bank\n    return {\n        "adjusted_bank_balance": adjusted_bank,\n        "reconciled": True,\n        "net_discrepancy": 0.0\n    }',
        out: 'Reconciled cashbook summary dictionary',
        cap: 'Audit 3 months of simulated cooperative cash ledgers, identifying and correcting reconciliation anomalies.'
      },
      {
        title: 'Smallholder Produce Invoicing and Member Payout Statements',
        q: 'When calculating net payout to a smallholder farmer for cherry delivery at a washing station, what deductions are standard?',
        options: ['Random fees decided by the driver', 'Input loans advanced (fertilizer/pesticide), cooperative transport levy, and statutory social security / SACCO savings contribution', '50% automatic penalty', 'No deductions can ever be made'],
        correct: 1,
        exp: 'Net payout subtracts authorized seasonal advances (fertilizer, seed loans) and agreed operational levies from gross crop delivery value.',
        task: 'Write a payout calculator function computing gross value, deductions, and net mobile money transfer for a farmer delivery.',
        code: 'def compute_farmer_payout(kg_delivered, price_per_kg, input_loan_deduction, coop_levy_pct=0.03):\n    gross_value = kg_delivered * price_per_kg\n    coop_levy = gross_value * coop_levy_pct\n    total_deductions = input_loan_deduction + coop_levy\n    net_payout = max(0.0, gross_value - total_deductions)\n    return {"gross_rwf": gross_value, "levy_rwf": coop_levy, "net_rwf": net_payout}',
        out: 'Farmer payout voucher with transparent deductions',
        cap: 'Build an automated digital voucher system generating itemized PDF receipts for coffee deliveries.'
      },
      {
        title: 'Financial Ratio Analysis: Liquidity and Solvency for Farm Cooperatives',
        q: 'What does a Current Ratio (Current Assets / Current Liabilities) below 1.0 indicate for an agribusiness enterprise?',
        options: ['The enterprise has excessive cash reserves', 'The cooperative may face liquidity distress and struggle to pay short-term supplier obligations due within 12 months', 'The enterprise is immune to drought', 'The profit margin is 100%'],
        correct: 1,
        exp: 'A current ratio below 1.0 signifies that short-term liabilities exceed short-term liquid assets, signaling operational liquidity risk.',
        task: 'Compute Current Ratio, Quick Ratio, and Debt-to-Equity ratio from a cooperative balance sheet.',
        code: 'def analyze_coop_liquidity(current_assets, inventory, current_liabilities, total_debt, member_equity):\n    current_ratio = current_assets / current_liabilities\n    quick_ratio = (current_assets - inventory) / current_liabilities\n    debt_to_equity = total_debt / member_equity\n    return {\n        "current_ratio": round(current_ratio, 2),\n        "quick_ratio": round(quick_ratio, 2),\n        "debt_to_equity": round(debt_to_equity, 2),\n        "solvent": current_ratio >= 1.2\n    }',
        out: 'Liquidity health diagnostic metrics',
        cap: 'Deliver a financial health assessment for a cooperative seeking an RDB modernization matching grant.'
      },
      {
        title: 'Micro-Loan Structuring and SACCO Working Capital Financing',
        q: 'Why do Umurenge SACCOs often structure seasonal agricultural credit with bullet repayment at harvest rather than equal monthly payments?',
        options: ['Monthly payments are illegal in Rwanda', 'Smallholder farmers generate cash flow primarily at harvest time, making monthly installments during planting season impractical', 'Banks do not have calendar tracking software', 'SACCOs only collect interest once a decade'],
        correct: 1,
        exp: 'Harvest-aligned cashflow matching structures repayments when farmers monetize their crops, dramatically lowering default rates.',
        task: 'Calculate the total interest and final bullet payment for a 6-month seasonal fertilizer loan at 14% annual interest.',
        code: 'def calculate_seasonal_sacco_loan(principal_rwf, annual_interest_pct, term_months=6):\n    monthly_rate = (annual_interest_pct / 100) / 12\n    total_interest = principal_rwf * monthly_rate * term_months\n    total_due_at_harvest = principal_rwf + total_interest\n    return {"principal": principal_rwf, "interest": total_interest, "total_repayment": total_due_at_harvest}',
        out: 'Seasonal bullet repayment calculation',
        cap: 'Design a cooperative working capital financing proposal negotiating credit terms with a local SACCO.'
      },
      {
        title: 'Post-Harvest Physiology: Moisture Content and Respiration Rates',
        q: 'What is the target maximum moisture content for stored maize grain to prevent Aspergillus flavus fungal growth and aflatoxin contamination?',
        options: ['22% to 25%', '13.0% to 13.5%', '5% or lower', '30%'],
        correct: 1,
        exp: 'Maize grain dried to <= 13.5% moisture prevents fungal growth, insect multiplication, and dangerous aflatoxin accumulation.',
        task: 'Write a grain inspection verification check that flags grain lots exceeding moisture safety limits.',
        code: 'def verify_grain_safety(batch_id, moisture_pct, temperature_c):\n    safe_moisture = moisture_pct <= 13.5\n    safe_temp = temperature_c <= 25.0\n    return {\n        "batch_id": batch_id,\n        "status": "APPROVED" if (safe_moisture and safe_temp) else "REJECT_FOR_DRYING",\n        "aflatoxin_risk": "LOW" if safe_moisture else "HIGH"\n    }',
        out: 'Grain inspection safety verdict',
        cap: 'Draft a post-harvest drying protocol for a cooperative receiving station in the Eastern Province.'
      },
      {
        title: 'Hermetic Storage Technologies for Grain and Legume Preservation',
        q: 'How do hermetic storage bags (such as Purdue Improved Crop Storage - PICS) protect stored grain without chemical insecticides?',
        options: ['They emit radioactive rays', 'They seal the crop airtight, causing insects to deplete available oxygen through respiration and die from asphyxiation', 'They dissolve pests on contact', 'They chill the grain to below freezing'],
        correct: 1,
        exp: 'Hermetic barriers prevent gas exchange; respiration of living organisms consumes oxygen (< 5%) and elevates CO2, suffocating pests organically.',
        task: 'Calculate the cost-benefit of hermetic bags vs standard woven sacks over a 9-month storage duration factoring in pest loss.',
        code: 'def hermetic_cost_benefit(tons_stored, price_per_ton, pest_loss_traditional_pct=0.20, pest_loss_hermetic_pct=0.01):\n    gross_value = tons_stored * price_per_ton\n    traditional_loss = gross_value * pest_loss_traditional_pct\n    hermetic_loss = gross_value * pest_loss_hermetic_pct\n    net_savings = traditional_loss - hermetic_loss\n    return {"traditional_loss_rwf": traditional_loss, "hermetic_loss_rwf": hermetic_loss, "net_savings_rwf": net_savings}',
        out: 'Cost-benefit comparison highlighting savings',
        cap: 'Formulate an enterprise adoption plan for deploying 5,000 hermetic bags across member cooperative households.'
      },
      {
        title: 'Cold-Chain Temperature Logging for Fresh Fruit and Vegetables',
        q: 'Why is unbroken cold-chain temperature management (2°C - 6°C) vital for French bean and avocado exports departing Kigali International Airport?',
        options: ['Cold temperatures change the color of the airplane', 'Every break in the cold chain triggers accelerated ethylene production and bacterial decay, leading to rejection at European ports', 'Airlines require vegetables to be frozen solid', 'Cold chain reduces air freight taxes'],
        correct: 1,
        exp: 'Fresh horticulture requires strict temperature continuity to slow respiration and physiological breakdown before arrival in overseas markets.',
        task: 'Write a telemetry audit function analyzing an array of hourly temperature logs to detect cold-chain violations.',
        code: 'def audit_cold_chain(temperature_logs, min_c=2.0, max_c=6.0):\n    violations = [log for log in temperature_logs if log["temp"] < min_c or log["temp"] > max_c]\n    return {\n        "total_readings": len(temperature_logs),\n        "violation_count": len(violations),\n        "compliant": len(violations) == 0,\n        "flagged_hours": [v["hour"] for v in violations]\n    }',
        out: 'Cold-chain audit compliance report',
        cap: 'Design an IoT temperature monitoring dashboard for export horticulture trucks travelling from Musanze to Kigali.'
      },
      {
        title: 'Grade Sorting and Defect Classification for Specialty Coffee',
        q: 'Under Specialty Coffee Association (SCA) cupping standards, how many Category 1 primary defects are allowed in a 350g green coffee sample?',
        options: ['Zero (0) Category 1 defects allowed for specialty grade', 'Up to 15 primary defects', 'Any number if beans are large', 'Defects do not affect coffee grading'],
        correct: 0,
        exp: 'Specialty Grade green coffee allows zero full black, full sour, pod/cherry, or severe insect damage beans in a 350g sample.',
        task: 'Classify green coffee lots based on primary/secondary defect counts into Specialty vs Commercial grade.',
        code: 'def grade_coffee_lot(cat1_defects, cat2_defects, cupping_score):\n    is_specialty = (cat1_defects == 0) and (cat2_defects <= 5) and (cupping_score >= 80.0)\n    return {\n        "tier": "Specialty Grade 1" if is_specialty else "Commercial Grade",\n        "eligible_for_premium_export": is_specialty,\n        "cupping_score": cupping_score\n    }',
        out: 'SCA-compliant coffee grading verdict',
        cap: 'Produce a visual defect classification manual for coffee washing station station managers.'
      },
      {
        title: 'Tea Plucking Quality Standards and Processing Timeline Controls',
        q: 'What is the national standard plucking formula for premium Rwandan CTC and orthodox tea production?',
        options: ['Coarse plucking of 5 leaves and a woody stem', '"Two leaves and a bud" (fine plucking)', 'Harvesting the entire bush to ground level', 'Plucking only yellow dried leaves'],
        correct: 1,
        exp: '"Two leaves and a bud" ensures tender leaf shoots with maximum polyphenol concentration and lowest fiber content for premier tea quality.',
        task: 'Calculate the fine plucking percentage of a tea delivery batch and determine eligibility for premium quality bonus.',
        code: 'def evaluate_tea_plucking_quality(sample_grams, two_leaves_and_bud_grams):\n    fine_plucking_pct = (two_leaves_and_bud_grams / sample_grams) * 100\n    bonus_eligible = fine_plucking_pct >= 65.0\n    return {"fine_plucking_pct": round(fine_plucking_pct, 1), "bonus_awarded": bonus_eligible}',
        out: 'Plucking quality score and bonus allocation',
        cap: 'Audit green leaf collection centers across a Western Province tea estate, establishing quality incentive frameworks.'
      },
      {
        title: 'Traceability Systems: Lot Tracking from Farm Gate to Export Terminal',
        q: 'What data elements must be encoded in a barcode or QR lot code to guarantee farm-to-cup traceability for Rwandan coffee?',
        options: ['Only the truck driver\'s license plate', 'Cooperative ID, Washing Station ID, Washing Lot Date, Elevation, Variety, and Farmer Member ID', 'The weather on the day of shipping', 'No data is needed once coffee is bagged'],
        correct: 1,
        exp: 'Full traceability encodes origin terroir, cooperative identification, processing batch, and harvesting date.',
        task: 'Generate a structured traceability identifier string from farm cooperative metadata.',
        code: 'def generate_traceability_code(coop_code, station_id, lot_date, variety="Bourbon"):\n    date_str = lot_date.replace("-", "")\n    return f"RW-{coop_code}-ST{station_id}-{date_str}-{variety[:3].upper()}"',
        out: 'Standardized traceability QR lot string',
        cap: 'Implement a digital QR traceability workflow connecting smallholder farmers directly with overseas roasters.'
      },
      {
        title: 'Organic and Fairtrade Certification Compliance Audits',
        q: 'What is the mandatory transition period required for conventional agricultural land to achieve full certified Organic status?',
        options: ['24 hours', '36 months (3 years) of documented synthetic chemical-free agronomy before harvest', '10 years', 'No transition period is required'],
        correct: 1,
        exp: 'International organic certification standards (EU & USDA) require a 36-month transition period free from synthetic fertilizers and prohibited pesticides.',
        task: 'Build a compliance verification checklist verifying chemical storage, buffer zones, and member record books for an organic audit.',
        code: 'def audit_organic_compliance(buffer_zone_meters, synthetic_chemicals_found, audit_logs_complete):\n    passed = (buffer_zone_meters >= 3.0) and (not synthetic_chemicals_found) and audit_logs_complete\n    return {"certified": passed, "critical_non_compliances": 0 if passed else 1}',
        out: 'Audit checklist evaluation outcome',
        cap: 'Lead a mock Fairtrade Internal Control System (ICS) inspection audit for a 300-member cooperative.'
      },
      {
        title: 'Sanitary and Phytosanitary (SPS) Standards for Regional Export',
        q: 'Which agency in Rwanda issues official phytosanitary export certificates verifying that agricultural produce is free from quarantine pests?',
        options: ['RRA (Rwanda Revenue Authority)', 'Rwanda Inspectorate, Competition and Consumer Protection Authority (RICA)', 'National Post Office', 'Ministry of Infrastructure'],
        correct: 1,
        exp: 'RICA inspects agricultural consignments and issues official phytosanitary certificates required for cross-border export.',
        task: 'Write a validation script checking export consignment documentation for phytosanitary certificate and packaging compliance.',
        code: 'def validate_sps_export_dossier(has_rica_certificate, pesticide_residue_ppm, max_allowed_ppm=0.01):\n    compliant = has_rica_certificate and (pesticide_residue_ppm <= max_allowed_ppm)\n    return {"export_cleared": compliant, "mrl_status": "PASS" if pesticide_residue_ppm <= max_allowed_ppm else "FAIL"}',
        out: 'SPS export clearance verification',
        cap: 'Compile a complete export compliance dossier for exporting 10 metric tons of fresh chili to regional EAC markets.'
      },
      {
        title: 'Mobile Money (MoMo) Bulk Disbursement for Farmer Harvests',
        q: 'Why has mobile money bulk disbursement replaced physical cash payments at rural coffee washing stations across Rwanda?',
        options: ['Physical cash is no longer legal tender', 'MoMo eliminates armed robbery risk, reduces physical cash handling fees, provides an immutable audit trail, and deposits funds directly into farmer accounts', 'MoMo only works in large cities', 'Cash takes up too much weight in trucks'],
        correct: 1,
        exp: 'Digital disbursements prevent theft, ensure transparent payments without intermediary skimming, and improve financial inclusion.',
        task: 'Write a bulk disbursement payment formatting function generating batch mobile money requests from a farmer delivery ledger.',
        code: 'def generate_momo_batch_payload(deliveries, rate_per_kg):\n    batch = []\n    for item in deliveries:\n        amount = int(item["kg"] * rate_per_kg)\n        batch.append({\n            "phone": item["phone"],\n            "amount_rwf": amount,\n            "reference": f"HARVEST-{item[\'member_id\']}"\n        })\n    return {"batch_size": len(batch), "total_disbursement": sum(b["amount_rwf"] for b in batch), "transactions": batch}',
        out: 'Validated MoMo batch disbursement JSON payload',
        cap: 'Build a mobile money reconciliation pipeline matching telecom transaction logs against warehouse delivery receipts.'
      },
      {
        title: 'Using Market Information Systems (e-Soko) for Price Discovery',
        q: 'How do national market price information systems (like e-Soko) empower smallholder farmers in commercial negotiations?',
        options: ['They force all buyers to pay the same price', 'They eliminate price asymmetry by providing real-time wholesale and retail market prices from Kigali and regional markets, preventing broker exploitation', 'They replace the need for harvesting crops', 'They set international currency exchange rates'],
        correct: 1,
        exp: 'Transparency in spot market pricing allows farmers to demand fair market value from local aggregators rather than accepting depressed quotes.',
        task: 'Write a script comparing local gate price against national wholesale benchmarks and calculating the broker margin percentage.',
        code: 'def evaluate_market_margin(local_gate_price, kigali_wholesale_price, transport_cost_per_kg):\n    net_kigali = kigali_wholesale_price - transport_cost_per_kg\n    broker_margin = net_kigali - local_gate_price\n    margin_pct = (broker_margin / kigali_wholesale_price) * 100\n    return {"broker_margin_rwf": broker_margin, "margin_pct": round(margin_pct, 1), "fair_price": broker_margin < (kigali_wholesale_price * 0.15)}',
        out: 'Market margin and price parity analysis',
        cap: 'Design an SMS-based market price advisory broadcast for cooperative members before harvest negotiations.'
      },
      {
        title: 'Forward Contracting and Price Risk Mitigation for Smallholders',
        q: 'What is the primary benefit of a forward contract established between a maize cooperative and an industrial brewery before planting?',
        options: ['The cooperative receives free equipment from the government', 'It locks in a guaranteed purchase volume and minimum floor price, mitigating harvest-time price collapse risks', 'The cooperative is excused from delivering grain', 'It prevents seasonal rains'],
        correct: 1,
        exp: 'Forward agreements hedge against price volatility by securing a guaranteed buyer and minimum price before planting capital is committed.',
        task: 'Calculate the cooperative revenue under a forward contract floor price vs open spot market during a supply glut.',
        code: 'def evaluate_forward_contract_hedge(tons, floor_price_rwf, spot_price_rwf):\n    forward_revenue = tons * floor_price_rwf\n    spot_revenue = tons * spot_price_rwf\n    hedge_benefit = forward_revenue - spot_revenue\n    return {"contract_revenue": forward_revenue, "spot_revenue": spot_revenue, "hedge_gain_rwf": max(0, hedge_benefit)}',
        out: 'Hedging protection revenue calculation',
        cap: 'Draft a commercial supply agreement incorporating minimum guaranteed pricing and quality bonus tiers.'
      },
      {
        title: 'Agricultural Input Procurement: Bulk Purchasing and Quality Verification',
        q: 'What economic advantage does a 500-member cooperative achieve by purchasing certified seed and fertilizer in bulk directly from distributors?',
        options: ['They avoid paying taxes', 'Economies of scale yield 15-30% volume discounts and guarantee certified seed authenticity, avoiding counterfeit markets', 'Bulk inputs never expire', 'Distributors deliver for free to individual homes'],
        correct: 1,
        exp: 'Bulk aggregation provides purchasing power, lower per-unit freight costs, and direct manufacturer provenance.',
        task: 'Write a bulk purchase order calculator applying tiered volume discounts to cooperative input orders.',
        code: 'def calculate_bulk_input_cost(bags_ordered, unit_price=25000):\n    discount = 0.15 if bags_ordered >= 500 else (0.10 if bags_ordered >= 200 else 0.0)\n    discounted_price = unit_price * (1 - discount)\n    total_cost = bags_ordered * discounted_price\n    return {"bags": bags_ordered, "effective_unit_price": discounted_price, "total_cost_rwf": total_cost, "discount_pct": discount * 100}',
        out: 'Discounted bulk order invoice total',
        cap: 'Prepare an annual input procurement plan with delivery schedule and member advance reconciliation.'
      },
      {
        title: 'Inventory Valuation: FIFO vs Weighted Average for Perishable Stocks',
        q: 'Why is the FIFO (First-In, First-Out) inventory valuation method critical when managing perishable warehouse stock like Irish potatoes?',
        options: ['FIFO is mandatory for income tax deductions', 'Physical stock rotation must ensure older harvested produce is shipped first to minimize biological rot and shrinkage losses', 'FIFO increases warehouse storage capacity', 'Potatoes improve in quality the longer they are stored'],
        correct: 1,
        exp: 'Aligning physical inventory issuance with FIFO prevents older perishable produce from rotting in storage bays.',
        task: 'Implement a FIFO warehouse inventory dispatch queue matching customer orders against oldest harvested batches.',
        code: 'def dispatch_fifo_inventory(batches, order_quantity):\n    dispatched = []\n    remaining = order_quantity\n    for batch in sorted(batches, key=lambda x: x["harvest_date"]):\n        if remaining <= 0: break\n        qty = min(remaining, batch["available_qty"])\n        dispatched.append({"batch_id": batch["id"], "qty": qty})\n        remaining -= qty\n    return {"dispatched_batches": dispatched, "fulfilled": remaining == 0}',
        out: 'FIFO batch allocation manifest',
        cap: 'Build a stock card audit system tracking storage bin numbers, harvest dates, and shrinkage rates.'
      },
      {
        title: 'Soil Nutrient Testing: N-P-K Ratios and Soil Acidity (pH) Correction',
        q: 'Many volcanic soils in northern Rwanda require agricultural lime (CaCO3) application. Why is lime necessary in acidic soils (pH < 5.5)?',
        options: ['Lime turns soil black', 'Soil acidity locks up essential nutrients like Phosphorus; liming raises pH to 6.0-6.5, restoring nutrient bioavailability and root uptake', 'Lime kills all earthworms', 'Lime replaces the need for organic compost'],
        correct: 1,
        exp: 'High acidity creates aluminum toxicity and fixes phosphorus into insoluble compounds; agricultural lime neutralizes acidity and releases nutrients.',
        task: 'Write a soil diagnostic function recommending lime application rates based on measured soil pH.',
        code: 'def recommend_soil_amendment(measured_ph):\n    if measured_ph < 5.0:\n        return {"status": "CRITICAL_ACIDITY", "lime_tons_per_ha": 3.5, "target_ph": 6.2}\n    elif measured_ph < 5.8:\n        return {"status": "MODERATE_ACIDITY", "lime_tons_per_ha": 2.0, "target_ph": 6.2}\n    else:\n        return {"status": "OPTIMAL_RANGE", "lime_tons_per_ha": 0.0, "target_ph": measured_ph}',
        out: 'Soil amendment recommendation advisory',
        cap: 'Develop a 3-year soil fertility and liming management plan for a 50-hectare cooperative farmland block.'
      },
      {
        title: 'Integrated Pest Management (IPM) Protocols for Horticulture',
        q: 'What is the guiding philosophy of Integrated Pest Management (IPM)?',
        options: ['Spraying synthetic pesticides every calendar week regardless of pest presence', 'Combining cultural, biological, and mechanical controls to keep pest populations below economic injury levels, using chemical pesticides only as a last resort', 'Banning all forms of pest control', 'Introducing non-native invasive predator insects'],
        correct: 1,
        exp: 'IPM minimizes environmental harm and chemical residues through biological controls, trap crops, and economic threshold scouting.',
        task: 'Write an IPM scouting decision algorithm that determines whether chemical spray is justified based on pest count per plant.',
        code: 'def evaluate_ipm_threshold(plants_scouted, total_pests_found, economic_threshold=5.0):\n    pest_density = total_pests_found / plants_scouted\n    spray_warranted = pest_density >= economic_threshold\n    return {\n        "pest_density": round(pest_density, 2),\n        "economic_threshold": economic_threshold,\n        "action": "SCHEDULE_TARGETED_SPRAY" if spray_warranted else "BIOLOGICAL_MONITORING_ONLY"\n    }',
        out: 'IPM intervention decision verdict',
        cap: 'Draft an IPM operational guide for passion fruit and tomato growers adhering to GlobalGAP standards.'
      },
      {
        title: 'Drip Irrigation System Design and Water Consumption Calculations',
        q: 'Why is drip irrigation significantly more water-efficient than furrow or overhead sprinkler systems in hilly Rwandan terrain?',
        options: ['Drip irrigation pipes do not use water', 'Water is applied slowly and directly to the plant root zone, eliminating soil erosion, runoff on hillsides, and evaporation losses', 'Sprinklers are prohibited by law', 'Drip systems only run during rainstorms'],
        correct: 1,
        exp: 'Drip irrigation achieves 90-95% water efficiency by delivering water precisely to the rhizosphere without hillside erosion.',
        task: 'Calculate daily irrigation water requirements in liters for a 1-hectare horticultural plot given crop evapotranspiration (ETc).',
        code: 'def calculate_irrigation_needs(hectares, etc_mm_per_day, efficiency_pct=0.90):\n    # 1 mm of water over 1 hectare = 10,000 liters\n    water_liters_net = hectares * etc_mm_per_day * 10000\n    water_liters_gross = water_liters_net / efficiency_pct\n    return {"daily_water_liters": int(water_liters_gross), "pump_runtime_hours_at_10k_lph": round(water_liters_gross / 10000, 1)}',
        out: 'Daily water consumption volume and pump runtime',
        cap: 'Design a solar-powered drip irrigation layout for a hillside cooperative vegetable terrace.'
      },
      {
        title: 'Composting and Organic Biomass Recycling on Commercial Farms',
        q: 'What is the optimal Carbon-to-Nitrogen (C:N) ratio for rapid, odor-free aerobic thermophilic composting?',
        options: ['5:1 (Too much nitrogen)', '25:1 to 30:1', '100:1 (Too much wood chip carbon)', '1:10'],
        correct: 1,
        exp: 'A 25:1 to 30:1 C:N ratio provides ideal energy (carbon) and protein synthesis (nitrogen) for aerobic thermophilic bacteria.',
        task: 'Calculate the blend ratio between coffee pulp (high nitrogen) and dry maize stalks (high carbon) to hit a 30:1 target.',
        code: 'def calculate_compost_blend(pulp_kg, pulp_cn=15, stalk_cn=60, target_cn=30):\n    # pulp_kg * (target - pulp) = stalk_kg * (stalk - target)\n    # pulp_kg * 15 = stalk_kg * 30 => stalk_kg = pulp_kg * (15/30)\n    stalk_kg_needed = pulp_kg * ((target_cn - pulp_cn) / (stalk_cn - target_cn))\n    return {"coffee_pulp_kg": pulp_kg, "dry_stalks_needed_kg": round(stalk_kg_needed, 1), "achieved_cn": target_cn}',
        out: 'Balanced organic biomass blending recipe',
        cap: 'Build a commercial composting protocol converting coffee pulp waste into organic fertilizer for 500 members.'
      },
      {
        title: 'Farm Machinery Maintenance Logs and Depreciation Calculations',
        q: 'Under straight-line depreciation, what is the annual depreciation expense of an agricultural tractor purchased for RWF 28,000,000 with a salvage value of RWF 4,000,000 and 8-year useful life?',
        options: ['RWF 3,000,000 per year', 'RWF 7,000,000 per year', 'RWF 500,000 per year', 'RWF 0'],
        correct: 0,
        exp: 'Straight-line depreciation = (Initial Cost - Salvage Value) / Useful Life = (28,000,000 - 4,000,000) / 8 = 3,000,000 RWF/year.',
        task: 'Write a machinery depreciation calculator providing annual expense and asset net book value schedule.',
        code: 'def calculate_straight_line_depreciation(cost, salvage_value, useful_years):\n    annual_expense = (cost - salvage_value) / useful_years\n    schedule = []\n    for yr in range(1, useful_years + 1):\n        schedule.append({"year": yr, "expense": annual_expense, "book_value": cost - (annual_expense * yr)})\n    return {"annual_depreciation": annual_expense, "schedule": schedule}',
        out: 'Complete straight-line depreciation schedule',
        cap: 'Develop a preventive maintenance log and capital equipment replacement reserve fund for a cooperative tractor pool.'
      },
      {
        title: 'Weather Index Insurance Mechanics for Drought and Flood Risk',
        q: 'How does Weather Index Insurance differ from traditional indemnity-based crop insurance in rural Africa?',
        options: ['Index insurance pays claims automatically based on objective satellite/weather station rainfall triggers without requiring on-farm claims adjusters', 'Index insurance pays out only when farmers retire', 'Index insurance requires farmers to visit London', 'Traditional insurance has zero claims verification'],
        correct: 0,
        exp: 'Index insurance uses predefined objective triggers (e.g. cumulative rainfall < 50mm in vegetative phase) for instant, dispute-free payouts.',
        task: 'Evaluate satellite rainfall telemetry against policy drought triggers to automate insurance claim payouts.',
        code: 'def evaluate_drought_index_payout(cumulative_rainfall_mm, trigger_threshold_mm=60.0, sum_insured_rwf=500000):\n    is_triggered = cumulative_rainfall_mm < trigger_threshold_mm\n    payout = sum_insured_rwf if is_triggered else 0\n    return {\n        "rainfall_recorded_mm": cumulative_rainfall_mm,\n        "payout_triggered": is_triggered,\n        "indemnity_payout_rwf": payout\n    }',
        out: 'Automated index insurance claim adjudication',
        cap: 'Design a climate resilience policy combining index insurance with community micro-irrigation reserves.'
      },
      {
        title: 'Cooperative Business Plan Development: 3-Year Operational Roadmap',
        q: 'What is the central purpose of an agribusiness cooperative business plan submitted to financing institutions like BRD?',
        options: ['To provide decorative posters for the office', 'To demonstrate commercial viability, market demand, financial projections, governance integrity, and debt repayment capability', 'To avoid paying legal registration fees', 'To replace the need for growing crops'],
        correct: 1,
        exp: 'Lenders evaluate cooperative business plans to verify revenue sustainability, governance competence, and debt service coverage.',
        task: 'Build a financial projection model computing projected gross profit and debt service coverage ratio (DSCR).',
        code: 'def project_coop_cashflow(annual_revenue, operating_expenses, annual_debt_service):\n    ebitda = annual_revenue - operating_expenses\n    dscr = ebitda / annual_debt_service\n    return {\n        "operating_profit_ebitda": ebitda,\n        "dscr": round(dscr, 2),\n        "bankable": dscr >= 1.25\n    }',
        out: 'Bankability and DSCR financial projection',
        cap: 'Author a complete 15-page bankable business plan for establishing a commercial cassava processing factory.'
      },
      {
        title: 'Breakeven Analysis for Value-Added Processing Units (e.g. Flour Milling)',
        q: 'If a cooperative invests in a grain mill with fixed costs of RWF 6,000,000/year, selling flour at RWF 600/kg with variable costs of RWF 400/kg, what is the breakeven volume in kg?',
        options: ['10,000 kg', '30,000 kg', '60,000 kg', '100,000 kg'],
        correct: 1,
        exp: 'Breakeven Quantity = Fixed Costs / (Selling Price - Variable Cost) = 6,000,000 / (600 - 400) = 6,000,000 / 200 = 30,000 kg.',
        task: 'Implement a breakeven analysis function calculating breakeven units and margin of safety.',
        code: 'def calculate_processing_breakeven(fixed_costs, price_per_unit, variable_cost_per_unit, current_sales_units):\n    unit_contribution = price_per_unit - variable_cost_per_unit\n    breakeven_units = fixed_costs / unit_contribution\n    margin_of_safety_pct = ((current_sales_units - breakeven_units) / current_sales_units) * 100\n    return {"breakeven_units": int(breakeven_units), "margin_of_safety_pct": round(margin_of_safety_pct, 1)}',
        out: 'Breakeven point and margin of safety calculation',
        cap: 'Develop a feasibility model evaluating profitability of adding a vacuum-packing line to a banana flour cooperative.'
      },
      {
        title: 'Carbon Credits and Agroforestry Integration on Smallholder Lands',
        q: 'How does planting shade trees (e.g. Grevillea robusta, Macadamia) on smallholder coffee farms generate supplemental revenue through voluntary carbon markets?',
        options: ['Trees produce gold in their roots', 'Trees sequester atmospheric carbon dioxide into woody biomass, generating verifiable carbon offsets (tCO2e) that international buyers purchase', 'Shade trees make coffee harvest twice as fast', 'Carbon credits are physical coins minted by banks'],
        correct: 1,
        exp: 'Agroforestry sequesters verifiable metric tons of carbon (tCO2e) which can be quantified and sold on international voluntary carbon markets.',
        task: 'Calculate annual metric tons of carbon sequestered and gross carbon revenue for a 200-hectare cooperative agroforestry block.',
        code: 'def calculate_agroforestry_carbon_revenue(hectares, trees_per_ha, sequestration_per_tree_kg=22, price_per_ton_usd=12.0):\n    total_trees = hectares * trees_per_ha\n    total_carbon_tons = (total_trees * sequestration_per_tree_kg) / 1000\n    gross_revenue_usd = total_carbon_tons * price_per_ton_usd\n    return {"total_trees": total_trees, "carbon_tons_sequestered": total_carbon_tons, "annual_carbon_revenue_usd": gross_revenue_usd}',
        out: 'Agroforestry carbon sequestration and revenue estimate',
        cap: 'Design an agroforestry tree nursery project for member farms with carbon credit verification monitoring.'
      },
      {
        title: 'Capstone Project: Complete Export-Grade Agribusiness Commercialization Dossier',
        q: 'What are the five mandatory components of an export-ready agribusiness dossier in Rwanda?',
        options: ['Farm registry, QC logs, Cold-Chain telemetry, RICA Phytosanitary certification, and Pro-Forma export invoice', 'A social media advertisement only', 'Three personal letters of recommendation', 'A map of Africa'],
        correct: 0,
        exp: 'Full export commercialization requires farm provenance, quality standards adherence, cold-chain integrity, regulatory clearance, and commercial billing.',
        task: 'Assemble an end-to-end export consignment manifest integrating lot code, weight, quality grade, and phyto certificate number.',
        code: 'def build_export_dossier(lot_id, destination_country, metric_tons, quality_grade, rica_phyto_no):\n    return {\n        "consignment_id": f"EXP-{lot_id}",\n        "destination": destination_country,\n        "volume_mt": metric_tons,\n        "grade": quality_grade,\n        "phytosanitary_certificate": rica_phyto_no,\n        "cleared_for_air_cargo": True\n    }',
        out: 'Complete export validation dossier record',
        cap: 'Deliver a comprehensive 20-page Agribusiness Cooperative Commercialization Masterplan ready for institutional investment and export licensing.'
      }
    ]
  },
  {
    courseId: 'c-5',
    courseName: 'MICE Tourism & High-End Hospitality Operations',
    skillTarget: 'MICE Operations, Guest Protocol & Tourism Management',
    topics: [
      {
        title: 'Principles of World-Class Customer Care & Luxury Hospitality',
        q: 'What is the core difference between basic customer service and luxury hospitality excellence?',
        options: ['Luxury hospitality is merely charging higher prices for drinks', 'Luxury hospitality is proactive and anticipatory: understanding unexpressed guest desires before they are articulated, creating unforgettable emotional resonance', 'Customer service only occurs during check-out', 'Hospitality applies only to five-star hotels'],
        correct: 1,
        exp: 'True hospitality excellence is anticipatory and empathetic, creating personalized experiences rather than merely transactional service.',
        task: 'Draft a guest preference onboarding card capturing personalized dietary, pillow, cultural, and schedule preferences.',
        code: 'Guest Profile Preferences Model:\n- Guest Name: Ambassador Jean-Luc Moreau\n- Language Preference: French & English\n- Dietary Restriction: Strict Pescatarian / Shellfish Allergy\n- Climate Preference: Room temperature 21°C\n- Turn-Down Preference: Sparkling water and chamomile tea at 9:00 PM\n- Special Notes: Prefers early morning newspaper and discreet lobby transit',
        out: 'Personalized luxury guest profile dossier',
        cap: 'Create a luxury standard-of-excellence service manual for a high-end Kigali boutique hotel.'
      },
      {
        title: 'Front Desk Check-in Protocols and Reservation Management Systems',
        q: 'What is the recommended maximum time standard for completing an executive check-in registration at an upscale business hotel?',
        options: ['45 minutes', 'Under 3 minutes, utilizing pre-registration key card preparation and digital signature verification', '30 seconds without checking identification', 'Over 2 hours'],
        correct: 1,
        exp: 'High-end hospitality targets seamless check-ins under 3 minutes by pre-authorizing payment and preparing welcome packets prior to arrival.',
        task: 'Write a PMS registration workflow function checking room availability, assigning VIP amenities, and issuing digital room keys.',
        code: 'def process_front_desk_checkin(reservation, is_vip=True):\n    reservation["status"] = "CHECKED_IN"\n    reservation["checkin_time"] = "14:05"\n    if is_vip:\n      reservation["amenities"] = ["Fruit Basket", "Cold Towel", "Welcome Letter"]\n    return {"reservation_id": reservation["id"], "room": reservation["room_number"], "status": "ACTIVE"}',
        out: 'Processed front-desk check-in record',
        cap: 'Audit a Property Management System (PMS) front desk workflow, reducing guest wait times by 50%.'
      },
      {
        title: 'International Diplomatic Protocol and State Guest Handling',
        q: 'When hosting bilateral diplomatic delegations in Kigali, how must national flags be displayed on meeting conference tables?',
        options: ['Flags are placed on the floor', 'The host country (Republic of Rwanda) flag is positioned on the right of the podium/head table from the speaker\'s perspective, with guest nation on the left', 'Flags should be kept inside luggage', 'Any random order is acceptable'],
        correct: 1,
        exp: 'International diplomatic etiquette requires the host nation\'s flag to occupy the place of honor (to the right of the principal speaker).',
        task: 'Draft a bilateral seating chart and protocol plan for a ministerial summit between Rwanda and a visiting delegation.',
        code: 'Bilateral Summit Seating Plan:\n- Head Table Host: Honorable Minister (Center Right)\n- Head Table Guest: Visiting Minister (Center Left)\n- Flanking Advisors: Permanent Secretaries directly adjacent\n- Interpreters: Positioned immediately behind principals with active audio feeds\n- Flag Placement: Rwanda flag stage right; Visiting delegation flag stage left',
        out: 'Diplomatic bilateral seating blueprint',
        cap: 'Formulate an official State Protocol briefing document for a ministerial summit hosted at the Kigali Convention Centre.'
      },
      {
        title: 'Cultural Etiquette: Welcoming Guests from Diverse Global Regions',
        q: 'When welcoming high-level business executives from East Asia, what greeting etiquette demonstrates professional respect?',
        options: ['Slapping the guest on the back', 'Offering and receiving business cards with both hands, accompanied by a polite bow, and reading the card carefully before setting it down', 'Immediately placing their business card into your back pocket without looking', 'Demanding they speak Kinyarwanda'],
        correct: 1,
        exp: 'In East Asian business culture, the business card is an extension of the individual; handling it with two hands signals profound respect.',
        task: 'Draft cultural etiquette tips for welcoming Middle Eastern, European, and East Asian delegations to Kigali summits.',
        code: 'Cultural Hospitality Guide:\n1. Middle Eastern Guests: Greet with right hand, provide Halal-certified dining options, avoid serving alcohol in primary greeting suites.\n2. East Asian Guests: Present business cards with both hands, honor seniority in seating arrangements, avoid aggressive confrontational debate.\n3. Nordic / European Guests: Prioritize punctual schedules, transparent sustainability metrics, and minimalist, high-efficiency logistics.',
        out: 'Cross-cultural hospitality protocol guide',
        cap: 'Train a 10-person concierge team on cultural intelligence protocols for the World Economic Forum Kigali session.'
      },
      {
        title: 'Guest Privacy, Data Protection, and Discretion Standards',
        q: 'What is the strict rule regarding hospitality staff discussing VIP guest identities, room numbers, or itineraries on social media?',
        options: ['Staff may post selfies with guest passports', 'Strict confidentiality: disclosing guest identities, room numbers, or schedules is an absolute violation of privacy law and grounds for immediate termination', 'Staff may live-stream VIP arrivals', 'Privacy rules apply only on weekends'],
        correct: 1,
        exp: 'Luxury and diplomatic hospitality depends fundamentally on ironclad discretion, confidentiality, and data protection compliance.',
        task: 'Write a non-disclosure and privacy agreement clause for hospitality staff handling international conference delegations.',
        code: 'Staff Privacy & Discretion Agreement:\n"Employees shall maintain absolute confidentiality regarding all guests. Under no circumstances may staff disclose guest identities, room assignments, itineraries, or private conversations to third parties or on personal social media platforms. Any breach constitutes gross misconduct under Rwandan labor law and results in immediate contractual termination and legal liability."',
        out: 'Binding employee privacy clause',
        cap: 'Implement a GDPR- and Rwanda Data Protection Law-compliant guest registration and disposal policy.'
      },
      {
        title: 'Handling Difficult Guests & Service Recovery Protocols',
        q: 'When an executive guest is visibly distressed by a room reservation error, what is the first verbal step of service recovery?',
        options: ['Argue with the guest and blame the night-shift clerk', 'Listen completely without interruption, validate their frustration with sincere empathy, and take immediate personal ownership of the solution', 'Walk away from the front desk', 'Threaten to call hotel security'],
        correct: 1,
        exp: 'De-escalation begins with empathetic active listening; taking immediate personal ownership reassures the guest that a resolution is underway.',
        task: 'Write an escalation resolution script for upgrading a delayed conference delegate to an executive suite with complimentary amenities.',
        code: 'Service Recovery Script:\n"Mr. Hakizimana, I understand completely how important settling in is after your long flight, and I apologize for the unexpected delay in preparing your original room. I have taken personal charge of your reservation and immediately upgraded you to our Presidential Club Suite on the 8th floor. Your luggage has already been transferred, and our compliments include full executive lounge access and breakfast throughout your stay. Please allow me to escort you up personally."',
        out: 'Empathetic service recovery dialogue',
        cap: 'Design a service recovery framework including authorized frontline compensatory thresholds (e.g. complimentary dining, upgrades).'
      },
      {
        title: 'Telephone Concierge Protocols and VIP Itinerary Coordination',
        q: 'What is the professional telephone standard for answering incoming calls at an international concierge desk?',
        options: ['"Hello, who is this?"', '"Good morning/afternoon, Concierge Desk, this is [Name] speaking, how may I assist you with your stay today?"', '"Wait a minute."', 'Letting the phone ring 15 times'],
        correct: 1,
        exp: 'Standard telephone etiquette requires answering within 3 rings with a warm greeting, department identification, personal name, and service offer.',
        task: 'Create a tailored 3-day itinerary for an international delegate exploring Kigali cultural heritage, dining, and art.',
        code: 'Kigali Cultural Delegate Itinerary:\n- Day 1: Morning visit to Kigali Genocide Memorial; Lunch at Heaven Restaurant; Afternoon visit to Inema Arts Center; Dinner at Fusion.\n- Day 2: Morning Kigali City Walking Tour (Nyamirambo Women\'s Center); Afternoon business meetings at KCC; Evening dinner at Pili Pili.\n- Day 3: Morning excursion to Mount Kigali; Afternoon coffee tasting session at Question Coffee Gishushu; Departure transfer.',
        out: 'Curated 3-day executive itinerary',
        cap: 'Develop a VIP concierge briefing guide connecting luxury travelers with authentic, sustainable Rwandan artisans.'
      },
      {
        title: 'Housekeeping Quality Audits and Room Turnaround Standards',
        q: 'In a 5-star hotel audit, which detail is considered a critical hygiene inspection checkpoint?',
        options: ['The wall paint color', 'Sanitization of high-touch surfaces (remote controls, door handles, light switches), spotless linen crispness, and zero bathroom watermarks', 'Whether the curtains are open at 2:00 AM', 'The brand of clothes the guest leaves in the closet'],
        correct: 1,
        exp: 'Hospitality hygiene audits focus on high-touch touchpoints and pristine sanitization to ensure zero pathogen transmission and immaculate luxury presentation.',
        task: 'Write an automated housekeeping room inspection checklist function calculating the quality score out of 100.',
        code: 'def audit_housekeeping_room(checklist_items):\n    # checklist_items is a list of booleans (True = passed checkpoint)\n    passed_count = sum(1 for item in checklist_items if item)\n    score = (passed_count / len(checklist_items)) * 100\n    return {\n        "score_pct": round(score, 1),\n        "passed_inspection": score >= 95.0,\n        "status": "READY_FOR_GUEST" if score >= 95.0 else "RETOUCH_REQUIRED"\n    }',
        out: 'Housekeeping audit scoring result',
        cap: 'Conduct a comprehensive 50-point housekeeping inspection audit for a presidential suite.'
      },
      {
        title: 'Food & Beverage Service Sequence in Fine Dining Establishments',
        q: 'In formal Western fine dining service, from which side of the guest should food plates be served, and from which side should beverages be poured?',
        options: ['Food served from left, beverages poured from right', 'Food served from right, beverages from left', 'Food thrown across the table', 'All service must be done from behind'],
        correct: 0,
        exp: 'Standard silver service etiquette dictates serving food plates from the guest\'s left side and pouring beverages/clearing plates from the right side.',
        task: 'Outline the formal 7-course service sequence timetable for a state gala dinner at the Kigali Convention Centre.',
        code: '7-Course Gala Service Sequence:\n1. 19:30 - Amuse-Bouche (Paired with sparkling beverage)\n2. 19:50 - Cold Appetizer: Lake Kivu Sambaza Tartare\n3. 20:15 - Soup: Sweet Potato and Ginger Velouté\n4. 20:40 - Palate Cleanser: Tree Tomato (Ikinyomoro) Sorbet\n5. 21:00 - Main Course: Grilled Akagera Beef Tenderloin with Plantain Mash\n6. 21:45 - Dessert: Single-Origin Rwandan Dark Chocolate Mousse\n7. 22:15 - Digestif & Rwandan Specialty Coffee / Tea Service',
        out: 'State gala 7-course service timeline',
        cap: 'Organize a mock banquet service training session evaluating banquet captains on table etiquette and silver service.'
      },
      {
        title: 'Menu Engineering and Dietary Restriction Management (Halal, Kosher, Vegan)',
        q: 'Why must commercial convention kitchens maintain separate prep areas and cookware for Halal and allergen-free meal preparations?',
        options: ['To increase kitchen renovation costs', 'To prevent cross-contamination of prohibited substances or severe allergens (e.g. peanuts, gluten, pork) that could trigger anaphylaxis or violate religious laws', 'Food tastes the same regardless', 'Health inspectors only check cold rooms'],
        correct: 1,
        exp: 'Cross-contact with allergens can cause fatal reactions; Halal and Kosher dietary laws mandate rigorous segregation of utensils and surfaces.',
        task: 'Write a dietary validation function that cross-references banquet attendee dietary requirements against planned menu allergens.',
        code: 'def verify_banquet_menu_safety(attendee_allergens, dish_ingredients):\n    conflicts = [item for item in attendee_allergens if item.lower() in [ing.lower() for ing in dish_ingredients]]\n    return {\n        "safe_to_serve": len(conflicts) == 0,\n        "flagged_allergens": conflicts\n    }',
        out: 'Banquet dietary safety screening',
        cap: 'Design an inclusive conference menu accommodating Vegan, Halal, Gluten-Free, and Nut-Allergy dietary profiles.'
      },
      {
        title: 'Banqueting Logistics: Head Table Seating and Protocol Formats',
        q: 'At an international conference banquet, who should be seated on the immediate right of the host at the head table?',
        options: ['The newest staff member', 'The most senior guest of honor or visiting head of state / delegation leader', 'The banquet chef', 'Nobody, the right seat is left vacant'],
        correct: 1,
        exp: 'In international diplomatic banqueting, the primary guest of honor is seated to the immediate right of the host.',
        task: 'Construct a banquet head table placement matrix for 12 dignitaries complying with diplomatic precedence.',
        code: 'Head Table Protocol Configuration (12 Seats):\n- Seat 6 (Center Right): Host (Rwandan Lead)\n- Seat 7 (Center Left): Chief Guest of Honor\n- Seat 5: Second Highest Ranking Guest\n- Seat 8: Second Highest Ranking Host Official\n- Seats 1-4 and 9-12: Arranged alternating Host/Guest in descending seniority order',
        out: 'Dignitary head table seating chart',
        cap: 'Supervise banquet table setup for a 300-delegate closing plenary dinner including name cards and menu placement.'
      },
      {
        title: 'MICE Industry Overview: The Global Meetings & Events Architecture',
        q: 'What do the letters in the acronym "MICE" represent in the tourism industry?',
        options: ['Mobile Internet Cellular Ecosystem', 'Meetings, Incentives, Conferences, and Exhibitions', 'Modern International Catering Enterprises', 'Museums, Institutes, Clubs, and Entertainment'],
        correct: 1,
        exp: 'MICE encompasses business tourism sectors: Meetings (corporate), Incentives (rewards), Conferences (summits), and Exhibitions (trade expos).',
        task: 'Calculate the total estimated economic impact of a 1,200-delegate, 4-day MICE conference in Kigali using daily expenditure benchmarks.',
        code: 'def calculate_mice_economic_impact(delegates=1200, days=4, avg_spend_per_day_usd=350):\n    direct_spend = delegates * days * avg_spend_per_day_usd\n    indirect_multiplier = 1.4\n    total_economic_impact = direct_spend * indirect_multiplier\n    return {\n        "direct_spend_usd": direct_spend,\n        "total_impact_usd": total_economic_impact,\n        "local_economy_injection_rwf": total_economic_impact * 1350\n    }',
        out: 'MICE macroeconomic impact calculation',
        cap: 'Prepare a macroeconomic presentation analyzing Kigali\'s rise as Africa\'s premier MICE destination in ICCA rankings.'
      },
      {
        title: 'Convention Venue Space Planning and Capacity Calculations',
        q: 'What is the standard floor space allocation per attendee for a Theater-style seating layout vs Classroom-style seating layout in conference halls?',
        options: ['Theater: ~1.0 - 1.2 m² per person; Classroom: ~1.8 - 2.2 m² per person', '10 m² for all styles', '0.2 m² per person', 'Classroom takes less space than theater'],
        correct: 0,
        exp: 'Theater seating requires less space (~1.0 m²/person) since there are no tables; classroom style requires tables and walkways (~2.0 m²/person).',
        task: 'Calculate the maximum seating capacity of a 500 m² convention hall in Theater, Classroom, and Banquet layouts.',
        code: 'def calculate_hall_capacities(hall_sqm=500):\n    theater_cap = int(hall_sqm / 1.1)\n    classroom_cap = int(hall_sqm / 2.0)\n    banquet_cap = int(hall_sqm / 1.8)\n    return {\n        "theater_capacity": theater_cap,\n        "classroom_capacity": classroom_cap,\n        "banquet_capacity": banquet_cap\n    }',
        out: 'Multi-layout convention capacity analysis',
        cap: 'Create a floor plan schematic for a 1,000 m² hall featuring main stage, breakout rooms, and registration concourse.'
      },
      {
        title: 'Audio-Visual (AV) Technical Setup and Simultaneous Interpretation Systems',
        q: 'Why are soundproof ISO-compliant interpretation booths essential for multilingual summits requiring simultaneous translation (e.g. Kinyarwanda, English, French)?',
        options: ['Interpreters need to sleep in the booths', 'To prevent ambient auditorium audio and interpreter voices from interfering with each other and to guarantee acoustic clarity over wireless headsets', 'Booths are required for lighting', 'To hide the translators from attendees'],
        correct: 1,
        exp: 'Simultaneous interpretation demands acoustic isolation so interpreters can listen clearly to the podium and broadcast translated audio without feedback.',
        task: 'Write an AV and interpretation technical checklist for a multilingual conference with 3 working languages.',
        code: 'AV & Interpretation Technical Rider:\n- 3 Soundproof ISO 4043 compliant simultaneous interpretation booths\n- 4 Dedicated channels: 01 (Original Floor), 02 (English), 03 (French), 04 (Kinyarwanda)\n- 600 Infrared wireless delegate headset receivers with channel selector\n- Redundant fiber-optic audio feeds connecting podium microphones to master console',
        out: 'Technical interpretation rider specifications',
        cap: 'Execute a pre-summit audio-visual dry run testing microphone gain, video switchers, and simultaneous translation relays.'
      },
      {
        title: 'Stage Management and Run-of-Show Timetable Coordination',
        q: 'What is a "Run-of-Show" (ROS) document in live event and conference production?',
        options: ['A ticket sales receipt', 'A minute-by-minute sequential schedule outlining every event element: speaker, audio cues, lighting presets, teleprompter notes, and slide transitions', 'A list of attendees who ran in the marathon', 'A backstage catering menu'],
        correct: 1,
        exp: 'The Run-of-Show document synchronizes the director, stage manager, audio engineer, and lighting crew on exact timing and cues.',
        task: 'Draft a 1-hour opening ceremony Run-of-Show with cue columns for Video, Audio, Stage, and Lighting.',
        code: '| Time | Segment | Stage Activity | Audio Cue | Video / Visual |\n|---|---|---|---|---|\n| 09:00 | House Open | Delegates enter hall | Soft background jazz | Digital welcome slide |\n| 09:15 | National Anthem | Delegates rise | National Anthem track | Rwandan flag graphic |\n| 09:20 | Opening Remarks | MC takes podium | Podium mic LIVE | MC Name lower-third |\n| 09:30 | Keynote Address | Minister arrives | Fanfare cue, then mic | Keynote presentation |',
        out: 'Detailed live production Run-of-Show',
        cap: 'Stage-manage a simulated 45-minute summit opening session calling live technical cues for lighting, audio, and video.'
      },
      {
        title: 'Delegate Registration Workflow and RFID Badge Printing',
        q: 'How does on-site badge printing with QR / RFID scanning streamline convention arrivals compared to manual pre-printed badge envelopes?',
        options: ['It costs more money to do', 'It reduces check-in queues to under 15 seconds per delegate, accommodates last-minute spelling edits instantly, and updates attendance telemetry in real time', 'It prevents delegates from attending', 'Badges can only be printed in black and white'],
        correct: 1,
        exp: 'Self-service QR badge scanning eliminates the bottleneck of searching through alphabetical boxes of badges, reducing wait times to seconds.',
        task: 'Write a delegate badge check-in processor that verifies ticket QR codes and logs badge print timestamps.',
        code: 'def process_badge_printing(ticket_qr, delegates_db):\n    delegate = next((d for d in delegates_db if d["qr"] == ticket_qr), None)\n    if not delegate:\n      return {"status": "INVALID_TICKET", "can_print": False}\n    delegate["checked_in"] = True\n    delegate["badge_printed_at"] = "2026-10-17T08:30:00Z"\n    return {"status": "BADGE_PRINT_SUCCESS", "name": delegate["name"], "org": delegate["org"], "category": delegate["category"]}',
        out: 'Fast delegate check-in and print trigger',
        cap: 'Deploy a high-throughput registration kiosk setup handling 1,000 delegates within a 60-minute peak window.'
      },
      {
        title: 'Exhibition Booth Management and Sponsor Relationship Coordination',
        q: 'In a trade exhibition, what is the role of an Exhibition Floor Manager during booth load-in and teardown?',
        options: ['Selling food to exhibitors', 'Enforcing fire safety clearances, managing electrical drop allocations, monitoring freight dock schedules, and ensuring booths do not exceed height limits', 'Painting all booths the same color', 'Taking personal gifts from sponsors'],
        correct: 1,
        exp: 'The floor manager ensures compliance with safety codes, logistics timetables, electrical safety, and sponsor contractual deliverables.',
        task: 'Draft an exhibitor handbook checklist covering move-in deadlines, power limits, and noise restrictions.',
        code: 'Exhibitor Compliance Rules:\n1. Load-In Window: Thursday 08:00 to 20:00 CAT; all crates must be cleared from aisles by 21:00.\n2. Power Allocation: Standard 3kW 230V drop per 3x3m booth; machinery exceeding 3kW requires master electrician approval.\n3. Sound Levels: Booth audio demonstrations must not exceed 70 dB measured 1 meter from boundary.\n4. Teardown: No booth dismantling permitted before closing ceremony at 17:00 Friday.',
        out: 'Exhibition technical regulations handbook',
        cap: 'Coordinate a 30-exhibitor commercial pavilion layout ensuring unobstructed emergency egress routes.'
      },
      {
        title: 'Crowd Management and Event Safety & Evacuation Protocols',
        q: 'What is the primary requirement for all emergency exit doors in high-occupancy convention halls holding over 500 people?',
        options: ['They must be padlocked from the outside', 'They must open outward in the direction of egress, be equipped with panic bars, remain completely unobstructed, and be clearly illuminated with emergency signage', 'They can be blocked by staging equipment', 'They must require a digital passcode to open'],
        correct: 1,
        exp: 'Life-safety codes mandate that exit doors push open easily via panic bars and swing outwards along the path of evacuation.',
        task: 'Write an emergency safety announcement script for the master of ceremonies in case of building alarm activation.',
        code: 'Emergency Evacuation Protocol Script:\n"Ladies and Gentlemen, may I please have your immediate attention. An alarm has sounded. We must evacuate the building as a safety precaution. Please remain calm, do not run, and leave all heavy belongings behind. Follow our floor marshals in the high-visibility vests toward the nearest illuminated green exit doors. Please gather at Assembly Point B in the south parking lot. Do not use elevators."',
        out: 'Emergency broadcast public address script',
        cap: 'Develop an integrated emergency evacuation and crowd management plan for a 2,500-attendee summit.'
      },
      {
        title: 'Eco-Tourism Principles in Rwanda: Volcanoes and Akagera Parks',
        q: 'How does Rwanda\'s tourism revenue sharing scheme contribute to conservation and community development around Volcanoes National Park?',
        options: ['100% of revenue is sent to international banks', '10% of park tourism revenues are directly invested in surrounding local community projects (clean water, schools, clinics, and cooperative agriculture)', 'Communities are prohibited from using water', 'Park revenues are only used to buy luxury cars'],
        correct: 1,
        exp: 'Rwanda\'s pioneering 10% Revenue Sharing scheme creates direct local economic incentives for wildlife conservation and anti-poaching.',
        task: 'Calculate the total community development allocation from mountain gorilla trekking permit revenues over a fiscal year.',
        code: 'def calculate_gorilla_revenue_share(permits_sold, permit_price_usd=1500, community_share_pct=0.10):\n    gross_revenue = permits_sold * permit_price_usd\n    community_fund = gross_revenue * community_share_pct\n    return {\n        "gross_permit_revenue_usd": gross_revenue,\n        "community_development_fund_usd": community_fund,\n        "community_fund_rwf": community_fund * 1350\n    }',
        out: 'Tourism revenue sharing distribution model',
        cap: 'Draft a sustainable community eco-lodge partnership proposal demonstrating conservation and poverty alleviation.'
      },
      {
        title: 'Gorilla Trekking Briefing Protocols and Community Tourism Ethics',
        q: 'What is the strict minimum viewing distance visitors must maintain from mountain gorillas to protect them from airborne human respiratory diseases?',
        options: ['1 meter', '7 meters (approximately 23 feet)', '50 meters with binoculars only', 'Physical contact is encouraged'],
        correct: 1,
        exp: 'Because mountain gorillas share ~98% of human DNA, a strict 7-meter distance is enforced to prevent viral and bacterial disease transmission.',
        task: 'Write a ranger briefing script delivered to international tourists before embarking on a gorilla tracking expedition.',
        code: 'Ranger Briefing Protocol - Volcanoes National Park:\n1. Distance: Maintain a minimum distance of 7 meters at all times. If a gorilla approaches, stay calm and step back slowly.\n2. Hygiene: If you need to cough or sneeze, turn your head away and cover your mouth with your elbow or handkerchief.\n3. Voice Level: Keep voices to a whisper when in the presence of the family.\n4. Time Limit: The viewing encounter is strictly limited to exactly one hour to minimize animal stress.\n5. Photography: Flash photography is strictly prohibited.',
        out: 'Official ranger briefing script',
        cap: 'Design an eco-tourist orientation handbook for luxury travelers exploring Rwanda\'s national park circuits.'
      },
      {
        title: 'Sustainable Waste Management and Single-Use Plastic Elimination in Lodges',
        q: 'Rwanda was one of the first countries globally to enact a total ban on non-biodegradable polythene plastic bags in 2008. How do eco-lodges uphold this standard?',
        options: ['Using paper and refillable glass water bottles, on-site composters, and elimination of single-use plastic packaging', 'Hiding plastic bags in customer rooms', 'Burning plastic in open pits', 'Importing plastic from abroad'],
        correct: 0,
        exp: 'Eco-lodges demonstrate environmental leadership by replacing single-use plastics with refillable glass, solar-purified water stations, and compostable toiletries.',
        task: 'Build a single-use plastic audit scorecard for evaluating hotel and lodge amenities.',
        code: 'def audit_plastic_elimination(amenities_list):\n    # amenities_list contains objects with item name and is_single_use_plastic boolean\n    plastics = [item["name"] for item in amenities_list if item["is_plastic"]]\n    return {\n        "compliant": len(plastics) == 0,\n        "plastic_items_detected": plastics,\n        "sustainability_score": round(((len(amenities_list) - len(plastics)) / len(amenities_list)) * 100, 1)\n    }',
        out: 'Zero-plastic audit scorecard',
        cap: 'Formulate an operational roadmap transitioning a 150-room hotel to zero single-use plastic status.'
      },
      {
        title: 'Hotel Revenue Management: RevPAR, ADR, and Occupancy Rate Metrics',
        q: 'What is the mathematical formula for Revenue Per Available Room (RevPAR), the core performance indicator in hospitality management?',
        options: ['RevPAR = Room Revenue / Total Guests', 'RevPAR = Average Daily Rate (ADR) × Occupancy Rate (or Total Room Revenue / Total Available Rooms)', 'RevPAR = Total Food Sales / Total Rooms', 'RevPAR = Hotel Profit / 365'],
        correct: 1,
        exp: 'RevPAR measures how effectively a hotel fills its inventory at competitive prices: ADR × Occupancy percentage.',
        task: 'Calculate ADR, Occupancy Rate, and RevPAR for a 200-room hotel selling 160 rooms at RWF 180,000 per night.',
        code: 'def calculate_hotel_kpis(total_rooms=200, rooms_sold=160, total_room_revenue=28800000):\n    occupancy_rate = rooms_sold / total_rooms\n    adr = total_room_revenue / rooms_sold\n    revpar = adr * occupancy_rate\n    return {\n        "occupancy_rate_pct": occupancy_rate * 100,\n        "average_daily_rate_rwf": adr,\n        "revpar_rwf": revpar\n    }',
        out: 'Key performance indicators (ADR, Occupancy, RevPAR)',
        cap: 'Deliver a monthly revenue management report analyzing RevPAR trends during major Kigali summits.'
      },
      {
        title: 'Dynamic Room Pricing Strategies during Peak Conference Seasons',
        q: 'When a major international conference (e.g. 5,000 delegates) is scheduled in Kigali, how should revenue managers adjust room rates dynamically?',
        options: ['Cut room prices by 80%', 'Implement tiered dynamic pricing: as city-wide hotel occupancy crosses 75% and 85%, adjust rates upward while enforcing minimum stay restrictions (e.g. 3-night minimum)', 'Keep prices fixed regardless of demand', 'Cancel all bookings'],
        correct: 1,
        exp: 'Dynamic pricing optimizes yield by raising rates as availability contracts and attaching minimum length of stay (MLOS) rules.',
        task: 'Implement a dynamic pricing algorithm adjusting room rate based on current hotel occupancy percentage.',
        code: 'def compute_dynamic_rate(base_rate_usd=200, current_occupancy_pct=85.0):\n    if current_occupancy_pct >= 90.0: multiplier = 1.6\n    elif current_occupancy_pct >= 80.0: multiplier = 1.35\n    elif current_occupancy_pct >= 70.0: multiplier = 1.15\n    else: multiplier = 1.0\n    return {"base_rate": base_rate_usd, "dynamic_rate": int(base_rate_usd * multiplier), "occupancy": current_occupancy_pct}',
        out: 'Dynamic yield-adjusted room rate calculation',
        cap: 'Construct an annual yield management calendar establishing pricing tiers for peak and green seasons.'
      },
      {
        title: 'Online Travel Agency (OTA) Channel Management and Direct Bookings',
        q: 'Why do luxury hotels prioritize direct booking engines on their own websites over third-party Online Travel Agencies (OTAs like Booking.com / Expedia)?',
        options: ['Direct bookings allow hotels to avoid paying 15-25% OTA commissions and allow direct relationship ownership with the guest', 'OTAs are illegal in East Africa', 'Direct websites do not need internet access', 'Hotels cannot receive credit card payments on OTAs'],
        correct: 0,
        exp: 'Direct bookings retain the full room rate without paying high 15-25% commission fees, improving gross operating margins.',
        task: 'Calculate the annual net commission savings if a hotel shifts 20% of its OTA bookings to direct website channels.',
        code: 'def calculate_direct_booking_savings(ota_revenue_usd=1200000, ota_commission_pct=0.18, target_shift_pct=0.20):\n    shifted_revenue = ota_revenue_usd * target_shift_pct\n    commission_saved = shifted_revenue * ota_commission_pct\n    return {"shifted_revenue_usd": shifted_revenue, "annual_commission_saved_usd": commission_saved}',
        out: 'Direct booking commission savings summary',
        cap: 'Develop a digital marketing strategy to drive direct bookings via SEO, loyalty incentives, and rate parity guarantees.'
      },
      {
        title: 'Digital Reputation Management: Responding to Online Guest Reviews',
        q: 'What is the professional protocol when publicly responding to a negative guest review on TripAdvisor or Google Reviews?',
        options: ['Delete the review and sue the customer', 'Thank the reviewer, apologize objectively for their specific negative experience, outline corrective actions taken, and invite them to connect privately with the General Manager', 'Post a rude response insulting the customer\'s family', 'Pretend to be another customer defending the hotel'],
        correct: 1,
        exp: 'A dignified, solution-oriented public reply demonstrates accountability to prospective travelers reviewing hotel standards.',
        task: 'Draft an executive management response to a guest review complaining about slow check-in during a major summit arrival.',
        code: 'Management Response to TripAdvisor Review:\n"Dear Ms. Venter,\n\nThank you for taking the time to share your feedback following your stay during the World Energy Summit. We are deeply grateful for your positive remarks regarding our restaurant staff.\n\nHowever, we sincerely apologize for the delay you encountered during check-in. Peak conference arrivals placed unexpected strain on our lobby reception, and this does not reflect our standard of service. We have since deployed mobile digital check-in tablets to eliminate queues during major events.\n\nI would welcome the opportunity to speak with you directly on your next visit to Kigali. Please feel free to reach out to me personally at gm@kigaliluxuryhotel.com.\n\nWarm regards,\nGeneral Manager"',
        out: 'Professional executive review response',
        cap: 'Formulate an online reputation management protocol and review response matrix for all customer feedback channels.'
      },
      {
        title: 'Event Budgeting: Cost Per Delegate and Break-Even Ticket Pricing',
        q: 'If a 2-day conference has fixed venue & AV costs of RWF 12,000,000 and variable catering/kit costs of RWF 25,000 per delegate, what is the cost per delegate if 400 delegates attend?',
        options: ['RWF 55,000 per delegate', 'RWF 25,000 per delegate', 'RWF 120,000 per delegate', 'RWF 10,000 per delegate'],
        correct: 0,
        exp: 'Cost per delegate = (Fixed Costs / Delegates) + Variable Cost = (12,000,000 / 400) + 25,000 = 30,000 + 25,000 = 55,000 RWF.',
        task: 'Write a conference budgeting calculator determining cost per delegate and breakeven ticket price with a 20% margin.',
        code: 'def calculate_conference_budget(fixed_costs_rwf, variable_cost_per_delegate_rwf, expected_delegates, margin_pct=0.20):\n    fixed_per_delegate = fixed_costs_rwf / expected_delegates\n    total_cost_per_delegate = fixed_per_delegate + variable_cost_per_delegate_rwf\n    ticket_price_with_margin = total_cost_per_delegate * (1 + margin_pct)\n    return {\n        "cost_per_delegate": int(total_cost_per_delegate),\n        "ticket_price_rwf": int(ticket_price_with_margin),\n        "total_budget_rwf": int(total_cost_per_delegate * expected_delegates)\n    }',
        out: 'Conference budget and pricing breakdown',
        cap: 'Build a comprehensive master budget spreadsheet for a 600-delegate international summit.'
      },
      {
        title: 'Vendor Procurement and Service Level Agreement (SLA) Contracts',
        q: 'What essential clause must be included in an AV/translation vendor SLA contract to protect against conference disruptions?',
        options: ['A clause stating the vendor can leave at any time', 'Strict performance metrics (e.g. 99.9% uptime, backup audio consoles on site, maximum 5-minute resolution time) tied to penalty deductions for service failure', 'Free meals for the vendor\'s family', 'Prohibiting contracts from being signed in ink'],
        correct: 1,
        exp: 'SLAs establish enforceable performance standards, redundancy mandates, and financial clawbacks for operational disruptions.',
        task: 'Draft a Service Level Agreement penalty schedule for audiovisual and translation failure during live summit sessions.',
        code: 'SLA Failure Penalty Clauses:\n1. Interpretation Audio Outage: If translation feeds fail for > 3 minutes during plenary sessions, vendor forfeits 15% of total contract value.\n2. Backup Equipment: Vendor must maintain 100% hot-standby audio mixer and spare microphones in the hall at all times.\n3. Late Setup: Failure to complete technical sound checks 2 hours prior to hall opening triggers an automatic 10% penalty.',
        out: 'Enforceable vendor SLA penalty schedule',
        cap: 'Draft a competitive RFP and vendor evaluation matrix for conference staging and catering contracts.'
      },
      {
        title: 'Hospitality Staff Rostering and Labor Cost Optimization',
        q: 'Why must banquet staff schedules be aligned with the banquet event order (BEO) rather than fixed static shifts?',
        options: ['To ensure staff never get paid', 'To align labor hours dynamically with peak service intervals (e.g. plating, clearing), optimizing labor costs while ensuring impeccable service ratios', 'Static shifts are prohibited by computer systems', 'BEOs do not contain timing information'],
        correct: 1,
        exp: 'Dynamic rostering scales staffing ratios to exact banquet service moments, avoiding overstaffing during idle pre-dinner hours.',
        task: 'Calculate the required number of banquet servers needed to maintain a 1:12 server-to-guest ratio for a 360-guest plated dinner.',
        code: 'def calculate_banquet_staffing(guest_count, server_ratio=12, captain_ratio=100):\n    servers_needed = int(guest_count / server_ratio)\n    captains_needed = max(1, int(guest_count / captain_ratio))\n    return {\n        "guests": guest_count,\n        "servers": servers_needed,\n        "captains": captains_needed,\n        "total_banquet_team": servers_needed + captains_needed\n    }',
        out: 'Banquet staffing headcount calculation',
        cap: 'Create a weekly master department roster for a 120-person hotel staff managing payroll budgets.'
      },
      {
        title: 'First Aid, CPR, and Health Emergency Response in Tourism Facilities',
        q: 'What is the immediate protocol when an international conference delegate collapses and is unresponsive in a conference concourse?',
        options: ['Walk away quietly', 'Check for responsiveness and breathing, immediately call emergency medical response (112), dispatch staff to retrieve the Automated External Defibrillator (AED), and initiate CPR if not breathing', 'Offer the delegate a glass of cold water', 'Take photos for social media'],
        correct: 1,
        exp: 'Sudden cardiac arrest requires immediate emergency response: early recognition, 112 notification, early CPR, and rapid AED defibrillation.',
        task: 'Draft an emergency medical response checklist for convention floor marshals and concierge supervisors.',
        code: 'Medical Emergency Rapid Action Checklist:\n1. Assess Scene Safety & Check Responsiveness.\n2. Call Hotel Emergency Extension 555 and Dispatch National EMS (112).\n3. Retrieve Hall Automated External Defibrillator (AED) and First Aid Kit.\n4. If unresponsive with no normal breathing: Begin chest compressions (100-120 per min) and attach AED.\n5. Designate staff member to meet ambulance at Gate 2 and clear freight elevator.',
        out: 'Life-safety medical emergency protocol',
        cap: 'Organize a certified First Aid / CPR refresher training program for hotel and conference center personnel.'
      },
      {
        title: 'Capstone Portfolio: Comprehensive 500-Delegate International Summit Operational Plan',
        q: 'What constitutes a complete, professional operational plan for hosting a 500-delegate international summit in Kigali?',
        options: ['Just a ticket price list', 'An integrated master document detailing Venue space plans, VIP protocols, Run-of-Show timing, Multilingual AV specs, Safety/Evacuation routes, and Sustainability waste plans', 'A list of attendees\' favorite songs', 'A short email saying everything is ready'],
        correct: 1,
        exp: 'Comprehensive event management synthesizes logistics, protocol, security, staging, and sustainability into a seamless execution blueprint.',
        task: 'Generate an executive summary and milestone matrix for a complete 500-delegate international summit operations binder.',
        code: 'def compile_summit_master_plan(event_name="Africa Green Growth Summit 2026", delegates=500):\n    return {\n        "summit_name": event_name,\n        "delegates": delegates,\n        "venue": "Kigali Convention Centre",\n        "modules_ready": [\n            "Bilateral Protocol & Flag Matrix",\n            "Plenary & Breakout Floor Plans",\n            "Run-of-Show Master Timetable",\n            "Simultaneous Interpretation Rider",\n            "Health & Evacuation Contingency Plan",\n            "Zero-Plastic Eco-Audit Certification"\n        ],\n        "readiness_status": "100% OPERATIONAL"\n    }',
        out: 'Comprehensive summit master operations binder status',
        cap: 'Submit a complete 25-page International Summit Operations Manual covering VIP protocol, audiovisual riders, crisis management, and eco-certification.'
      }
    ]
  }
];

// Generate the 150 assessments
const assessments = [];
let totalCounter = 1;

subjects.forEach((subj) => {
  subj.topics.forEach((topic, idx) => {
    const numStr = String(idx + 1).padStart(2, '0');
    const id = `as-${subj.courseId}-${numStr}`;
    const assessment = {
      id,
      courseId: subj.courseId,
      title: `${subj.courseName.split(':')[0]} — ${topic.title}`,
      skillTarget: subj.skillTarget,
      totalDuration: `${30 + (idx % 4) * 5} mins`,
      difficulty: idx < 10 ? 'Foundation (Level 1)' : (idx < 22 ? 'Practitioner (Level 2)' : 'Specialist (Level 3)'),
      theoryWeight: 30,
      practicalWeight: 40,
      projectWeight: 30,
      theoryQuestions: [
        {
          id: `q-${subj.courseId}-${numStr}-1`,
          prompt: topic.q,
          options: topic.options,
          correctIndex: topic.correct,
          explanation: topic.exp
        },
        {
          id: `q-${subj.courseId}-${numStr}-2`,
          prompt: `In practical application of "${topic.title}", what standard ensures verifiable reproducibility and operational rigor?`,
          options: [
            'Adhering to documented NISR, RCA, or international standards with explicit validation checks',
            'Relying on ad-hoc personal intuition without written records',
            'Skipping error handling to reduce script run time',
            'Using arbitrary uncalibrated metrics'
          ],
          correctIndex: 0,
          explanation: 'Operational rigor requires grounding methodology in verifiable standards, empirical metrics, and documented audit trails.'
        }
      ],
      practicalTask: {
        instruction: topic.task,
        starterCode: topic.code,
        expectedOutputSnippet: topic.out
      },
      capstoneBrief: topic.cap
    };
    assessments.push(assessment);
  });
});

console.log(`Generated ${assessments.length} assessments across ${subjects.length} subjects.`);

const fileContent = `// 150 Comprehensive, domain-rich assessments across all 5 subjects (30 per subject)
export const allAssessments = ${JSON.stringify(assessments, null, 2)};

export default allAssessments;
`;

const outputPath = path.resolve('backend/src/db/assessmentsData.js');
fs.writeFileSync(outputPath, fileContent, 'utf-8');
console.log(`Saved to ${outputPath} (${fs.statSync(outputPath).size} bytes)`);
