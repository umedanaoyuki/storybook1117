import { useState } from "react";

type DessertType = "" | "chocolate" | "cake" | "pie";
type ChocolateType = "" | "dark" | "milk" | "white";
type CakeType = "" | "shortcake" | "cheesecake" | "chocolatecake";
type PieType = "" | "applepie" | "cherrypie" | "pecanpie";
type DarkType = "" | "a" | "b" | "c";
type MilkType = "" | "d" | "e" | "f";
type WhiteType = "" | "g" | "h" | "i";

function App() {
  const [mainSelection, setMainSelection] = useState<DessertType>("");
  const [subSelection, setSubSelection] = useState<ChocolateType | CakeType | PieType>("");
  const [secondSubSelection, setSecondSubSelection] = useState<DarkType | MilkType | WhiteType>("");
  const [error, setError] = useState<string>("");

  const handleMainChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMainSelection(event.target.value as DessertType);
    setSubSelection("");
    setSecondSubSelection("");
    setError("");
  };

  const handleSubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubSelection(event.target.value as ChocolateType | CakeType | PieType);
    setSecondSubSelection("");
    setError("");
  };

  const handleSecondSubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSecondSubSelection(event.target.value as DarkType | MilkType | WhiteType);
    setError("");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!mainSelection) {
      setError("メインの選択は必須です");
      return;
    }
    if (!subSelection) {
      setError("詳細の選択は必須です");
      return;
    }
    if (mainSelection === "chocolate" && !secondSubSelection) {
      setError("チョコレートの種類を選択してください");
      return;
    }
    
    // バリデーション成功時の処理
    const selectedMain = mainOptions.find(o => o.value === mainSelection)?.label;
    const selectedSub = getSubOptions().find(o => o.value === subSelection)?.label;
    const selectedSecondSub = secondSubSelection 
      ? getSecondSubOptions().find(o => o.value === secondSubSelection)?.label 
      : "";

    const message = selectedSecondSub
      ? `選択完了！\nメイン: ${selectedMain}\n詳細: ${selectedSub}\n種類: ${selectedSecondSub}`
      : `選択完了！\nメイン: ${selectedMain}\n詳細: ${selectedSub}`;

    alert(message);
  };

  const mainOptions = [
    { value: "chocolate", label: "チョコレート" },
    { value: "cake", label: "ケーキ" },
    { value: "pie", label: "パイ" },
  ];

  const getSubOptions = () => {
    switch (mainSelection) {
      case "chocolate":
        return [
          { value: "dark", label: "ダークチョコレート" },
          { value: "milk", label: "ミルクチョコレート" },
          { value: "white", label: "ホワイトチョコレート" },
        ];
      case "cake":
        return [
          { value: "shortcake", label: "ショートケーキ" },
          { value: "cheesecake", label: "チーズケーキ" },
          { value: "chocolatecake", label: "チョコレートケーキ" },
        ];
      case "pie":
        return [
          { value: "applepie", label: "アップルパイ" },
          { value: "cherrypie", label: "チェリーパイ" },
          { value: "pecanpie", label: "ピーカンパイ" },
        ];
      default:
        return [];
    }
  };

  const getSecondSubOptions = () => {
    switch (subSelection) {
      case "dark":
        return [
          { value: "a", label: "ビター" },
          { value: "b", label: "セミスイート" },
          { value: "c", label: "スイートダーク" },
        ];
      case "milk":
        return [
          { value: "d", label: "プレーン" },
          { value: "e", label: "キャラメル" },
          { value: "f", label: "ヘーゼルナッツ" },
        ];
      case "white":
        return [
          { value: "g", label: "バニラ" },
          { value: "h", label: "ストロベリー" },
          { value: "i", label: "抹茶" },
        ];
      default:
        return [];
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* メインの選択 */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium text-gray-900">デザートを選択してください</h2>
          <div className="space-y-2">
            {mainOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <input
                  type="radio"
                  id={option.value}
                  name="mainSelection"
                  value={option.value}
                  checked={mainSelection === option.value}
                  onChange={handleMainChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label htmlFor={option.value} className="text-gray-700 cursor-pointer">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* サブの選択 */}
        {mainSelection && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">種類を選択してください</h2>
            <div className="space-y-2">
              {getSubOptions().map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={option.value}
                    name="subSelection"
                    value={option.value}
                    checked={subSelection === option.value}
                    onChange={handleSubChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={option.value} className="text-gray-700 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 第三の選択（チョコレートの場合のみ） */}
        {mainSelection === "chocolate" && subSelection && (
          <div className="space-y-4">
            <h2 className="text-lg font-medium text-gray-900">味を選択してください</h2>
            <div className="space-y-2">
              {getSecondSubOptions().map((option) => (
                <div key={option.value} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id={option.value}
                    name="secondSubSelection"
                    value={option.value}
                    checked={secondSubSelection === option.value}
                    onChange={handleSecondSubChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <label htmlFor={option.value} className="text-gray-700 cursor-pointer">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* エラーメッセージ */}
        {error && (
          <div className="text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* 選択結果の表示 */}
        {mainSelection && subSelection && (
          <div className="mt-4 p-4 bg-green-50 rounded-md">
            <p className="text-green-700">
              選択中: {mainOptions.find(o => o.value === mainSelection)?.label} - 
              {getSubOptions().find(o => o.value === subSelection)?.label}
              {secondSubSelection && ` - ${getSecondSubOptions().find(o => o.value === secondSubSelection)?.label}`}
            </p>
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          選択を確定
        </button>
      </form>
    </div>
  );
}

export default App;