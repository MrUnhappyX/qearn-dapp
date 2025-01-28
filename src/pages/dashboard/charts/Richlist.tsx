import { EChart } from '@kbox-labs/react-echarts';
import Card from '@/components/ui/Card';
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { SVGRenderer } from 'echarts/renderers';
import { EChartsOption } from 'echarts';
import { useAtomValue } from 'jotai';
import { latestStatsAtom } from '@/store/latestStats';
import { useState, useEffect } from 'react';
import { fetchRichList } from '@/services/rpc.service';
import { LABELS } from '@/data/labels';
import { custom } from '@/data/chart-theme';

const Richlist: React.FC = () => {
  const [richlist, setRichlist] = useState<{ identity: string; balance: number }[]>([]);
  const latestStats = useAtomValue(latestStatsAtom);

  useEffect(() => {
    if (!latestStats) return;
    fetchRichList(1, 15).then((res) => {
      const entries = res?.richList?.entities.map((entity) => ({
        identity: LABELS[entity.identity as keyof typeof LABELS] || `User ${entity.identity.slice(0, 4)}`,
        balance: Number(entity.balance),
      }));
      const totalAmount = entries.reduce((acc, curr) => acc + curr.balance, 0);
      entries.push({
        identity: 'Others',
        balance: Number(latestStats.circulatingSupply) - totalAmount,
      });
      setRichlist(entries);
    });
  }, [latestStats]);

  const option: EChartsOption = {
    title: {
      text: 'Qubic Richlist',
      left: 'center',
      textAlign: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    series: [
      {
        name: 'Distribution',
        type: 'pie',
        radius: '60%',
        center: ['40%', '50%'],
        data: richlist.map((item) => ({
          value: item.balance,
          name: item.identity,
          percentage: (item.balance * 100) / Number(latestStats.circulatingSupply),
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  const chartComponents = [TitleComponent, TooltipComponent, LegendComponent, GridComponent, PieChart, SVGRenderer, LabelLayout];

  return (
    <Card className="max-w-lg p-4">
      <EChart style={{ width: '400px', height: '400px' }} theme={custom} use={chartComponents} {...option} />
    </Card>
  );
};

export default Richlist;
