import { FundCard } from '@/components/fund-card';
import { fundsData } from '@/lib/fund-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export function ResultsView() {
  return (
    <div className="container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1 space-y-4">
        {fundsData.map((fund) => (
          <FundCard key={fund.id} fund={fund} />
        ))}
      </div>
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-[#303030] border-0 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Justification for Manager Selection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-white mb-1">
                1. Manager Selection Aligned with Inflection Point Identification
              </h3>
              <p>
                Each manager chosen in this model portfolio has been evaluated
                through a framework similar to Flextion's InFlextion approach,
                focusing on identification at key performance inflection points
                rather than relying on recent returns alone. This approach aims
                to capture future outperformance by recognizing managers who are
                poised for improvement based on their probability of superior
                future returns, not merely past peaks.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                2. Data-Driven Evaluation over Market Timing Noise
              </h3>
              <p>
                Traditional timing signals (calendar-based metrics) often
                mislead investment decisions, leading to buy-high / sell-low
                behavior. The managers selected here are backed by quantitative
                indicators of future return potential, reflecting Flextion's
                philosophy of shifting focus from "clock time" to "market time"
                likelihood estimates.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                3. Robust Scoring and Metric Framework
              </h3>
              <p>
                Each manager's inclusion is justified not just by historical
                returns, but by robust scoring methods like{' '}
                <span className="font-semibold text-white">
                  FlexScore and FlexMetrics
                </span>
                , which assess the probability of improved performance and
                expected relative returns. These multi-factor evaluations
                improve confidence in long-term outcomes and reduce reliance on
                simplistic ranking systems.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                4. Avoidance of Behavior-Induced Performance Drag
              </h3>
              <p>
                By prioritizing managers at inflection points, this portfolio
                mitigates the "behavior gap" – the underperformance caused by
                poor timing decisions – and positions the model portfolio to
                capture alpha through disciplined, data-driven timing insights.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#303030] border-0 text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              How This Philosophy Enhances the 60/40 Model
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-300 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-white mb-1">
                Large Cap Allocation (60%)
              </h3>
              <p>
                Managers in the large cap segment are selected based on
                combinations of stability and latent performance inflection
                potential – i.e., managers with strong structural advantages who
                may be transitioning into improved relative performance phases
                identified by data-driven scoring. This aligns with Flextion's
                belief that the best opportunities often lie where the market{' '}
                <span className="italic">has yet to recognize improvement potential</span>.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">
                Mid Cap Allocation (40%)
              </h3>
              <p>
                Mid cap managers are included where their probabilistic future
                return indicators suggest an upcoming performance uptick,
                especially where traditional rankings may overlook growth
                potential due to recent underperformance. This objective aligns
                with Flextion's strategy of recognizing managers poised to
                outperform post-underperformance.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
